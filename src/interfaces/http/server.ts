import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { routes } from './routes'
import info from '../../../config/info.json'

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })
app.register(fastifySwagger, {
  openapi: {
    info: { ...info.openapi.info },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, { routePrefix: info.routerDoc })
app.register(routes, { prefix: info.routerPrefix })

const start = async (): Promise<void> => {
  const port = Number(process.env.SERVER_PORT)
  await app.listen({
    host: process.env.SERVER_HOST,
    port,
  })
  app.log.info(`API Gateway is running on port ${port}`)
}

export { app, start }
