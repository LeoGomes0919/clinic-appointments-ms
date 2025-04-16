import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { AppointmentModel } from '../models/AppointmentModel'
import { Appointment } from '@/domain/entities/Appointment'

export class AppointmentMapper {
  public static toEntity(appointmentModel: AppointmentModel): Appointment {
    return new Appointment(
      new UniqueEntityId(appointmentModel.doctorId),
      new UniqueEntityId(appointmentModel.patientId),
      appointmentModel.status,
      appointmentModel.appointmentDate,
      appointmentModel.createdAt,
      appointmentModel.updatedAt,
      appointmentModel.deletedAt,
      appointmentModel.id ? new UniqueEntityId(appointmentModel.id) : null,
    )
  }

  public static toDatabase(appointment: Appointment): AppointmentModel {
    return {
      id: appointment.id?.toString(),
      doctorId: appointment.doctorId.toString(),
      patientId: appointment.patientId.toString(),
      status: appointment.status,
      appointmentDate: appointment.appointmentDate,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      deletedAt: appointment.deletedAt,
    }
  }
}
