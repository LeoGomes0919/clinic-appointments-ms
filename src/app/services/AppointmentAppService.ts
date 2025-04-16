import { inject, injectable } from 'tsyringe'
import { parseISO } from 'date-fns'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'
import { AppointmentDomainService } from '@/domain/services/AppointmentDomainService'
import { RegisterAppointmentCommand } from '../commands/RegisterAppointmentCommand'
import { IAppointmentDTO } from '../dtos/IAppointmentDTO'
import { EnumStatusAppointment } from '@/domain/enums/EnumStatusAppointment'
import { Appointment } from '@/domain/entities/Appointment'
import { UpdateAppointmentCommand } from '../commands/UpdateAppointmentCommand'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

@injectable()
export class AppointmentAppService {
  constructor(
    @inject('AppointmentDomainService')
    private readonly appointmentDomainService: AppointmentDomainService,
  ) {}

  async create(command: RegisterAppointmentCommand): Promise<IAppointmentDTO> {
    const status = EnumStatusAppointment.SCHEDULED

    const appointment = Appointment.create({ ...command, status })

    const registered = await this.appointmentDomainService.register(appointment)

    return this.toDTO(registered)
  }

  async update(command: UpdateAppointmentCommand): Promise<IAppointmentDTO> {
    const updated = await this.appointmentDomainService.update(command.id, {
      ...command,
    })

    return this.toDTO(updated)
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<IAppointmentDTO>> {
    const paginatedResult = await this.appointmentDomainService.getAllPaginated(
      page,
      limit,
    )
    const parsedData = paginatedResult.items.map((appointment) =>
      this.toDTO(appointment),
    )

    return {
      ...paginatedResult,
      items: parsedData,
    }
  }

  async findById(id: UniqueEntityId): Promise<IAppointmentDTO> {
    const appointment = await this.appointmentDomainService.getById(id)

    return this.toDTO(appointment)
  }

  async cancel(id: UniqueEntityId): Promise<void> {
    await this.appointmentDomainService.cancel(id)
  }

  async complete(id: UniqueEntityId): Promise<void> {
    await this.appointmentDomainService.complete(id)
  }

  private toDTO(appointment: Appointment): IAppointmentDTO {
    return {
      id: appointment.id,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      status: appointment.status,
      appointmentDate: appointment.appointmentDate,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      deletedAt: appointment.deletedAt,
    }
  }
}
