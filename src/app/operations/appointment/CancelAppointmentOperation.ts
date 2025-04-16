import { inject, injectable } from 'tsyringe'
import { AppointmentAppService } from '@/app/services/AppointmentAppService'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

@injectable()
export class CancelAppointmentOperation {
  constructor(
    @inject('AppointmentAppService')
    private readonly appointmentAppService: AppointmentAppService,
  ) {}

  async execute(id: UniqueEntityId): Promise<void> {
    await this.appointmentAppService.cancel(id)
  }
}
