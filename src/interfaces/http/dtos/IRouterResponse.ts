import { FastifyReply, FastifyRequest } from 'fastify'

export interface IRouterResponse {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  path: string
  schema: Record<string, any>
  handler: (request: FastifyRequest, reply: FastifyReply) => Promise<any>
  response: Record<string, any>
}
