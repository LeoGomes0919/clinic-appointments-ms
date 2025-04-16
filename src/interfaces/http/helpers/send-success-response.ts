import { FastifyReply } from 'fastify'

export interface ApiLink {
  rel: string
  href: string
  method: string
}

export interface ApiResponse<T> {
  status: number
  data: T
  message?: string
  links?: ApiLink[]
}

export const sendSuccessResponse = <T>(
  reply: FastifyReply,
  status: number,
  data: T,
  message?: string,
  links?: ApiLink[],
): FastifyReply => {
  const response: ApiResponse<T> = {
    status,
    data,
    ...(message && { message }),
    ...(links && links.length > 0 ? { links } : {}),
  }

  return reply.status(status).send(response)
}
