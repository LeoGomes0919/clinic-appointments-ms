import { FastifyTypedInstance } from '@/shared/utils/types'
import { routerRegister } from './routerRegister'
import { appointmentRoutes } from './appointment/appointmentRoutes'

export async function routes(app: FastifyTypedInstance): Promise<void> {
  const routes = [...appointmentRoutes()]

  const register = routerRegister(app)
  await register(routes)
}
