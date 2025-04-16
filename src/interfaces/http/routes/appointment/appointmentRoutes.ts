import { httpConstants } from '@/shared/utils/httpConstants'
import { appointmentSchema } from './appointmentSchema'
import { IRouterResponse } from '../../dtos/IRouterResponse'
import { container } from 'tsyringe'
import { AppointmentController } from '../../controllers/AppointmentController'

export const appointmentRoutes = (): IRouterResponse[] => {
  const appointmentController = container.resolve(AppointmentController)

  return [
    {
      method: 'get',
      path: '/appointments',
      schema: {
        tags: ['appointments'],
        description: 'List all appointments',
        query: appointmentSchema.query,
      },
      handler: appointmentController.findAllPaginated,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: appointmentSchema.response,
        },
      },
    },
    {
      method: 'post',
      path: '/appointments',
      schema: {
        tags: ['appointments'],
        description: 'Create a new appointment',
        body: appointmentSchema.body,
      },
      handler: appointmentController.create,
      response: {
        [httpConstants.code.CREATED]: {
          description: 'Successful response',
          schema: appointmentSchema.response,
        },
      },
    },
    {
      method: 'put',
      path: '/appointments/:id',
      schema: {
        tags: ['appointments'],
        description: 'Update a appointment by ID',
        params: appointmentSchema.params,
        body: appointmentSchema.bodyUpdate,
      },
      handler: appointmentController.update,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: appointmentSchema.response,
        },
      },
    },
    {
      method: 'get',
      path: '/appointments/:id',
      schema: {
        tags: ['appointments'],
        description: 'Get a appointment by ID',
        params: appointmentSchema.params,
      },
      handler: appointmentController.findById,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: appointmentSchema.response,
        },
      },
    },
    {
      method: 'delete',
      path: '/appointments/:id/cancel',
      schema: {
        tags: ['appointments'],
        description: 'Cancel a appointment by ID',
        params: appointmentSchema.params,
      },
      handler: appointmentController.cancelAppointment,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: appointmentSchema.response,
        },
      },
    },
    {
      method: 'patch',
      path: '/appointments/:id/complete',
      schema: {
        tags: ['appointments'],
        description: 'Complete a appointment by ID',
        params: appointmentSchema.params,
      },
      handler: appointmentController.completeAppointment,
      response: {
        [httpConstants.code.OK]: {
          description: 'Successful response',
          schema: appointmentSchema.response,
        },
      },
    },
  ]
}
