import { inject, injectable } from 'tsyringe'
import { AppointmentAppService } from '@/app/services/AppointmentAppService'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { IAppointmentDTO } from '@/app/dtos/IAppointmentDTO'

@injectable()
export class GetAppointmentOperation {
  constructor(
    @inject('AppointmentAppService')
    private readonly AppointmentAppService: AppointmentAppService,
  ) {}

  async execute(id: UniqueEntityId): Promise<IAppointmentDTO> {
    return await this.AppointmentAppService.findById(id)
  }
}
