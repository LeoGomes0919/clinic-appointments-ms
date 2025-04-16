import z from 'zod'
import { IBaseRegisterSchema } from '../../dtos/IBaseRegisterSchema'

export const appointmentSchema = {
  ...IBaseRegisterSchema,
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({
    page: z.coerce.number().default(1).optional(),
    limit: z.coerce.number().default(10).optional(),
  }),
  bodyUpdate: z.object({
    doctorId: z.string().uuid().optional(),
    appointmentDate: z.string().datetime().optional(),
  }),
}
