import { FastifyTypedInstance } from '@/shared/utils/types'
import { IRouterResponse } from '../dtos/IRouterResponse'

export function routerRegister(
  app: FastifyTypedInstance,
): (routes: IRouterResponse[]) => Promise<FastifyTypedInstance> {
  return async (routes: IRouterResponse[]) => {
    routes.forEach(({ method, path, schema, handler }) => {
      app[method](path, { schema }, handler)
    })
    return app
  }
}
