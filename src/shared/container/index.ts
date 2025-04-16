import { container } from 'tsyringe'

import { EnumMessage } from '@/domain/enums/EnumMessage'
import { AppDataSource } from '@/infra/config/dataSource'
import { IAppointmentRepository } from '@/domain/repositories/IAppointmentRepository'
import { AppointmentRepository } from '@/infra/persistence/typeorm/repositories/AppointmentRepository'
import { AppointmentDomainService } from '@/domain/services/AppointmentDomainService'
import { AppointmentController } from '@/interfaces/http/controllers/AppointmentController'
import { AppointmentSerializer } from '@/interfaces/http/routes/appointment/AppointmentSerializer'
import { AppointmentAppService } from '@/app/services/AppointmentAppService'

container.registerSingleton<IAppointmentRepository>(
  'IAppointmentRepository',
  AppointmentRepository,
)
container.registerSingleton<AppointmentDomainService>(
  'AppointmentDomainService',
  AppointmentDomainService,
)
container.registerSingleton<AppointmentAppService>(
  'AppointmentAppService',
  AppointmentAppService,
)

container.registerSingleton(AppointmentController)
container.registerSingleton(AppointmentSerializer)
container.registerInstance('EnumMessage', EnumMessage)
container.register('DataSource', { useValue: AppDataSource })
