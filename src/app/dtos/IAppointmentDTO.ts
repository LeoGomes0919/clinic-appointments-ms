import { EnumStatusAppointment } from './../../domain/enums/EnumStatusAppointment'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

export interface IAppointmentDTO {
  id: UniqueEntityId
  doctorId: UniqueEntityId
  patientId: UniqueEntityId
  status: keyof typeof EnumStatusAppointment
  appointmentDate: Date
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
