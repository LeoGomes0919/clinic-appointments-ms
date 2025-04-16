import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { IRegisterAppointmentDTO } from '../dtos/IRegisterAppointmentDTO'

export class UpdateAppointmentCommand {
  public readonly id: UniqueEntityId
  public readonly doctorId: UniqueEntityId
  public readonly appointmentDate: Date

  constructor(input: Partial<IRegisterAppointmentDTO>) {
    this.id = input.id
    this.doctorId = input.doctorId
    this.appointmentDate = input.appointmentDate
  }
}
