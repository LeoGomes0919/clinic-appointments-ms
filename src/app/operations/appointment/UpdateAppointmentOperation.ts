import { UpdateAppointmentCommand } from '@/app/commands/UpdateAppointmentCommand'
import { IAppointmentDTO } from '@/app/dtos/IAppointmentDTO'
import { IRegisterAppointmentDTO } from '@/app/dtos/IRegisterAppointmentDTO'
import { AppointmentAppService } from '@/app/services/AppointmentAppService'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateAppointmentOperation {
  constructor(
    @inject('AppointmentAppService')
    private readonly appointmentAppService: AppointmentAppService,
  ) {}

  async execute(
    data: Partial<IRegisterAppointmentDTO>,
  ): Promise<IAppointmentDTO> {
    const command = new UpdateAppointmentCommand({ ...data })

    return await this.appointmentAppService.update(command)
  }
}
