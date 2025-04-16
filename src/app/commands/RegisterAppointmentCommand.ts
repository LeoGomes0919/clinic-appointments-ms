import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { IBaseRegisterDTO } from '../dtos/IBaseRegisterDTO'

export class RegisterAppointmentCommand {
  public readonly patientId: UniqueEntityId
  public readonly doctorId: UniqueEntityId
  public readonly appointmentDate: Date

  constructor(input: IBaseRegisterDTO) {
    this.doctorId = input.doctorId
    this.patientId = input.patientId
    this.appointmentDate = input.appointmentDate
  }
}
