import { DataSource } from 'typeorm'
import { BaseRepository } from './BaseRepository'
import { inject, injectable } from 'tsyringe'
import { Constructor } from './RepositoryTypes'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'
import { Appointment } from '@/domain/entities/Appointment'
import { AppointmentModel } from '../models/AppointmentModel'
import { AppointmentMapper } from '../mappers/AppointmentMapper'
import { IAppointmentRepository } from '@/domain/repositories/IAppointmentRepository'
import { addMinutes, subMinutes } from 'date-fns'
import { EnumStatusAppointment } from '@/domain/enums/EnumStatusAppointment'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

@injectable()
export class AppointmentRepository
  extends BaseRepository<Appointment, AppointmentModel>
  implements IAppointmentRepository {
  constructor(@inject('DataSource') dataSource: DataSource) {
    super(AppointmentModel as Constructor<AppointmentModel>, dataSource)
  }

  protected toDomain(patientModel: AppointmentModel): Appointment {
    return AppointmentMapper.toEntity(patientModel)
  }

  protected toPersistence(patient: Appointment): AppointmentModel {
    return AppointmentMapper.toDatabase(patient) as AppointmentModel
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<Appointment>> {
    const [result, total] = await this.ormRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })

    const appointments = result.map((patientModel) =>
      this.toDomain(patientModel),
    )
    const pages = Math.ceil(total / limit)

    return {
      items: appointments,
      total,
      pages,
      current: page,
    }
  }

  async findAll(): Promise<Appointment[]> {
    const appointmentModels = await this.ormRepository.find()
    return appointmentModels.map((appointment) => this.toDomain(appointment))
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await this.ormRepository.softDelete({ id: id.toString() })
  }

  async update(
    id: UniqueEntityId,
    entity: Partial<Appointment>,
  ): Promise<Appointment> {
    const result = await this.ormRepository.update(
      { id: id.toString() },
      {
        doctorId: entity.doctorId.toString(),
        appointmentDate: entity.appointmentDate,
      },
    )

    if (result.affected === 0) {
      throw new Error('Appointment not found')
    }

    const appointment = await this.ormRepository.findOneBy({
      id: id.toString(),
    })
    return this.toDomain(appointment)
  }

  async findByDoctorIdAndAppointmentDate(
    doctorId: UniqueEntityId,
    appointmentDate: Date,
  ): Promise<Appointment> {
    const startRange = subMinutes(appointmentDate, 30)
    const endRange = addMinutes(appointmentDate, 30)

    const existsAppointment = await this.ormRepository
      .createQueryBuilder('appointment')
      .where('appointment.doctorId = :doctorId', {
        doctorId: doctorId.toString(),
      })
      .andWhere(
        'appointment.appointmentDate BETWEEN :startRange AND :endRange',
        {
          startRange,
          endRange,
        },
      )
      .getOne()

    if (!existsAppointment) return null

    return this.toDomain(existsAppointment)
  }

  async findByPatientIdAndAppointmentDate(
    patientId: UniqueEntityId,
    appointmentDate: Date,
  ): Promise<Appointment> {
    const startRange = subMinutes(appointmentDate, 30)
    const endRange = addMinutes(appointmentDate, 30)

    const existsAppointment = await this.ormRepository
      .createQueryBuilder('appointment')
      .where('appointment.patientId = :patientId', {
        patientId: patientId.toString(),
      })
      .andWhere(
        'appointment.appointmentDate BETWEEN :startRange AND :endRange',
        {
          startRange,
          endRange,
        },
      )
      .getOne()

    if (!existsAppointment) return null

    return this.toDomain(existsAppointment)
  }

  async updateStatus(
    id: UniqueEntityId,
    status: EnumStatusAppointment,
  ): Promise<Appointment> {
    const result = await this.ormRepository.update(
      { id: id.toString() },
      { status },
    )

    if (result.affected === 0) {
      throw new Error('Appointment not found')
    }

    const appointment = await this.ormRepository.findOneBy({
      id: id.toString(),
    })

    return this.toDomain(appointment)
  }
}
