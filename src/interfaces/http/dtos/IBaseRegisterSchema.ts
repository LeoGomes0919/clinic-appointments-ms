import z from 'zod'
import { IBaseRouterSchema } from './IBaseRouterSchema'

type IRegisterSchema = IBaseRouterSchema

export const IBaseRegisterSchema: IRegisterSchema = {
  body: z.object({
    patientId: z.string().uuid(),
    doctorId: z.string().uuid(),
    appointmentDate: z.string().datetime(),
  }),
  response: {
    200: z.object({}),
    400: z.object({}),
    409: z.object({}),
    422: z.object({}),
    500: z.object({}),
  },
}
