import { Appointment } from '../entities/Appointment'
import { EnumStatusAppointment } from '../enums/EnumStatusAppointment'
import { UniqueEntityId } from '../value-objects/UniqueEntityId'
import { IBaseRepository } from './IBaseRepository'

export interface IAppointmentRepository extends IBaseRepository<Appointment> {
  findByDoctorIdAndAppointmentDate(
    doctorId: UniqueEntityId,
    appointmentDate: Date,
  ): Promise<Appointment | null>
  findByPatientIdAndAppointmentDate(
    patientId: UniqueEntityId,
    appointmentDate: Date,
  ): Promise<Appointment | null>
  updateStatus(
    id: UniqueEntityId,
    status: EnumStatusAppointment,
  ): Promise<Appointment>
}
