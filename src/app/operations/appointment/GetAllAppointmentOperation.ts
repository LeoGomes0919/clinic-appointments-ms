import { inject, injectable } from 'tsyringe'
import { IPaginationProps } from '@/domain/repositories/IBaseRepository'
import { AppointmentAppService } from '@/app/services/AppointmentAppService'
import { IAppointmentDTO } from '@/app/dtos/IAppointmentDTO'

@injectable()
export class GetAllAppointmentOperation {
  constructor(
    @inject('AppointmentAppService')
    private readonly appointmentAppService: AppointmentAppService,
  ) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<IPaginationProps<IAppointmentDTO>> {
    return await this.appointmentAppService.findAllPaginated(page, limit)
  }
}
