import { IAppointmentDTO } from '@/app/dtos/IAppointmentDTO'
import { hateos } from '../../commons/hateos'
import { internalSerialize } from '../../commons/internalSerialize'

export class AppointmentSerializer {
  public serialize(appointment: IAppointmentDTO): object {
    const { id, createdAt, updatedAt, deletedAt, ...others } = appointment
    const links = hateos.default(id.toString(), 'appointments')
    const internal = internalSerialize.serialize({
      createdAt,
      updatedAt,
      deletedAt,
    })

    return Object.assign({
      data: { ...others, ...internal },
      links,
    })
  }

  public serializeMany(appointments: IAppointmentDTO[]): object {
    const data = appointments.map((appointment) => {
      const { id } = appointment
      const links = hateos.default(id.toString(), 'appointments')
      const internal = internalSerialize.serialize(appointment)

      return Object.assign(appointment, { links }, internal)
    })

    return data
  }
}
