import { RegisterAppointmentCommand } from '@/app/commands/RegisterAppointmentCommand'
import { IAppointmentDTO } from '@/app/dtos/IAppointmentDTO'
import { IRegisterAppointmentDTO } from '@/app/dtos/IRegisterAppointmentDTO'
import { AppointmentAppService } from '@/app/services/AppointmentAppService'
import { inject, injectable } from 'tsyringe'

@injectable()
export class RegisterAppointmentOperation {
  constructor(
    @inject('AppointmentAppService')
    private readonly appointmentAppService: AppointmentAppService,
  ) {}

  async execute(data: IRegisterAppointmentDTO): Promise<IAppointmentDTO> {
    const command = new RegisterAppointmentCommand({ ...data })

    return await this.appointmentAppService.create(command)
  }
}
