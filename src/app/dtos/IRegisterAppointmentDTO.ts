import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

export interface IRegisterAppointmentDTO {
  id?: UniqueEntityId
  doctorId: UniqueEntityId
  patientId: UniqueEntityId
  appointmentDate: Date
}
