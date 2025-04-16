import { inject, injectable } from 'tsyringe'
import axios from 'axios'
import { NotFoundException } from '../exceptions/NotFoundException'
import { EnumMessage } from '../enums/EnumMessage'
import { IPaginationProps } from '../repositories/IBaseRepository'
import { getHours, isBefore, isSameDay, parseISO } from 'date-fns'
import { IAppointmentRepository } from '../repositories/IAppointmentRepository'
import { Appointment } from '../entities/Appointment'
import { BusinessException } from '../exceptions/BusinessException'
import { ContractException } from '../exceptions/ContractException'
import { EnumStatusAppointment } from '../enums/EnumStatusAppointment'
import { UniqueEntityId } from '../value-objects/UniqueEntityId'
import { getLocalTimeFromUTC } from '@/shared/utils/getLocalTimeFromUTC'

interface IUpdateProps {
  doctorId?: UniqueEntityId
  appointmentDate?: Date
}

interface IResponseHoliday {
  date: string
  name: string
  type: string
}

@injectable()
export class AppointmentDomainService {
  constructor(
    @inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    @inject('EnumMessage') private readonly enumMessage: typeof EnumMessage,
  ) {}

  private holidayApiUrl = process.env.HOLIDAYS_API_URL
  private patientServiceUrl = process.env.EXTERNAL_API_URL.concat(
    process.env.PATIENT_SERVICE_URL,
  )
  private doctorServiceUrl = process.env.EXTERNAL_API_URL.concat(
    process.env.DOCTOR_SERVICE_URL,
  )

  async register(appointment: Appointment): Promise<Appointment> {
    const { patientId, doctorId } = appointment

    await Promise.all([
      this.validatePatient(patientId),
      this.validateDoctor(doctorId),
      this.validateAppointmentDate(appointment),
    ])

    return await this.appointmentRepository.create(appointment)
  }

  async update(
    id: UniqueEntityId,
    appointment: IUpdateProps,
  ): Promise<Appointment> {
    const existingUser = await this.appointmentRepository.findById(id)

    if (!existingUser) {
      throw new NotFoundException(this.enumMessage.APPOINTMENT_NOT_FOUND)
    }

    if (appointment.doctorId) {
      await this.validateDoctor(appointment.doctorId)
    } else {
      appointment.doctorId = existingUser.doctorId
    }

    if (appointment.appointmentDate) {
      await this.validateAppointmentDate({
        ...existingUser,
        patientId: existingUser.patientId,
        ...appointment,
      } as Appointment)
    }

    return await this.appointmentRepository.update(id, appointment)
  }

  async getAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<Appointment>> {
    return await this.appointmentRepository.findAllPaginated(page, limit)
  }

  async getById(id: UniqueEntityId): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id)
    if (!appointment) {
      throw new NotFoundException(this.enumMessage.APPOINTMENT_NOT_FOUND)
    }

    return appointment
  }

  async cancel(id: UniqueEntityId): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id)
    if (!appointment) {
      throw new NotFoundException(this.enumMessage.APPOINTMENT_NOT_FOUND)
    }

    if (appointment.status === EnumStatusAppointment.COMPLETED) {
      throw new BusinessException(this.enumMessage.APPOINTMENT_COMPLETED)
    }

    await this.appointmentRepository.updateStatus(
      id,
      EnumStatusAppointment.CANCELED,
    )
  }

  async complete(id: UniqueEntityId): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id)
    if (!appointment) {
      throw new NotFoundException(this.enumMessage.APPOINTMENT_NOT_FOUND)
    }
    if (appointment.status === EnumStatusAppointment.CANCELED) {
      throw new BusinessException(this.enumMessage.APPOINTMENT_CANCELED)
    }
    if (appointment.status === EnumStatusAppointment.COMPLETED) {
      throw new BusinessException(
        this.enumMessage.APPOINTMENT_ALREADY_COMPLETED,
      )
    }
    await this.appointmentRepository.updateStatus(
      id,
      EnumStatusAppointment.COMPLETED,
    )
  }

  private async validatePatient(patientId: UniqueEntityId): Promise<void> {
    try {
      await axios.get(`${this.patientServiceUrl}/${patientId.toString()}`)
    } catch (error) {
      throw new ContractException(
        {
          error_code: error.response?.data?.status,
          message: this.enumMessage.PATIENT_NOT_FOUND,
        },
        error.response?.data,
      )
    }
  }

  private async validateDoctor(doctorId: UniqueEntityId): Promise<void> {
    const { data } = await axios.get(
      `${this.doctorServiceUrl}/${doctorId.toString()}`,
    )

    if (data?.status === 404) {
      throw new ContractException(this.enumMessage.PATIENT_NOT_FOUND)
    }

    if (data?.status === 500) {
      throw new BusinessException(this.enumMessage.INTERNAL_SERVER_ERROR)
    }
  }

  private async validateHoliday(appointmentDate: Date): Promise<void> {
    const year = appointmentDate.getFullYear()

    const fullDate = parseISO(appointmentDate.toISOString().substring(0, 10))

    const { data } = await axios.get<IResponseHoliday[]>(
      `${this.holidayApiUrl}/${year}`,
    )

    const isHoliday = data.some((holiday) =>
      isSameDay(fullDate, parseISO(holiday.date)),
    )

    if (isHoliday) {
      throw new ContractException(this.enumMessage.HOLIDAY_DATE)
    }
  }

  private async validateAppointmentDate(
    appointment: Appointment,
  ): Promise<void> {
    const currentDate = new Date()
    const appointmentDate = new Date(appointment.appointmentDate)

    if (isBefore(appointmentDate, currentDate)) {
      throw new ContractException(this.enumMessage.APPOINTMENT_DATE_PASSED)
    }

    const { hour } = getLocalTimeFromUTC(appointmentDate.toISOString())
    if (hour < 8 || hour >= 18) {
      throw new ContractException(this.enumMessage.APPOINTMENT_HOUR_INVALID)
    }

    const [existingDoctor, existingPatient] = await Promise.all([
      this.appointmentRepository.findByDoctorIdAndAppointmentDate(
        appointment.doctorId,
        appointmentDate,
      ),
      this.appointmentRepository.findByPatientIdAndAppointmentDate(
        appointment.patientId,
        appointmentDate,
      ),
    ])

    if (existingDoctor || existingPatient) {
      throw new ContractException(this.enumMessage.APPOINTMENT_ALREADY_EXISTS)
    }

    await this.validateHoliday(appointmentDate)
  }
}
