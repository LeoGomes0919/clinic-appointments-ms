import { ZodObject, ZodRawShape, ZodType } from 'zod'

export interface IBaseRouterSchema {
  headers?: ZodObject<ZodRawShape>
  query?: ZodObject<ZodRawShape>
  params?: ZodObject<ZodRawShape>
  body?: ZodObject<ZodRawShape>
  response: Record<number, ZodObject<ZodRawShape>>
}
