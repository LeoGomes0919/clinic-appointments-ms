import { Enum } from '@/shared/utils/enum'
import { httpConstants } from '@/shared/utils/httpConstants'
import { FastifyReply } from 'fastify'

interface ProblemDetails {
  title: string
  status: number
  detail: string
  instance?: string
  errors?: Record<string, string>
}

export function sendErrorResponse(
  reply: FastifyReply,
  status: number,
  detail: string,
  options?: {
    type?: string
    title?: string
    instance?: string
    errors?: Record<string, string>
  },
) {
  const title = Enum(httpConstants.code).key(status as any)
  const problem: ProblemDetails = {
    title: title || options?.title,
    status,
    detail,
    ...(options?.instance && { instance: options.instance }),
    ...(options?.errors && { errors: options.errors }),
  }

  return reply.status(status).send(problem)
}
