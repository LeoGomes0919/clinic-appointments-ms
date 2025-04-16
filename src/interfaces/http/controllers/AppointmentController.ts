import { Exception } from '@/domain/exceptions/Exception'
import { FastifyReply, FastifyRequest } from 'fastify'
import { sendErrorResponse } from '../helpers/send-error-response'
import { container } from 'tsyringe'
import { httpConstants } from '@/shared/utils/httpConstants'
import { IRegisterAppointmentDTO } from '@/app/dtos/IRegisterAppointmentDTO'
import { RegisterAppointmentCommand } from '@/app/commands/RegisterAppointmentCommand'
import { RegisterAppointmentOperation } from '@/app/operations/appointment/RegisterAppointmentOperation'
import { AppointmentSerializer } from '../routes/appointment/AppointmentSerializer'
import { GetAllAppointmentOperation } from '@/app/operations/appointment/GetAllAppointmentOperation'
import { UpdateAppointmentCommand } from '@/app/commands/UpdateAppointmentCommand'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { UpdateAppointmentOperation } from '@/app/operations/appointment/UpdateAppointmentOperation'
import { GetAppointmentOperation } from '@/app/operations/appointment/GetAppointmentOperation'
import { CancelAppointmentOperation } from '@/app/operations/appointment/CancelAppointmentOperation'
import { CompleteAppointmentOperation } from '@/app/operations/appointment/CompleteAppointmentOperation'

export class AppointmentController {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const data = request.body as IRegisterAppointmentDTO
      const registerCommand = new RegisterAppointmentCommand(data)
      const registerAppointmentOperation = container.resolve(
        RegisterAppointmentOperation,
      )
      const appointmentMapper = container.resolve(AppointmentSerializer)

      const appointment =
        await registerAppointmentOperation.execute(registerCommand)
      const serializedAppointment = appointmentMapper.serialize(appointment)

      return reply
        .status(httpConstants.code.CREATED)
        .send(serializedAppointment)
    } catch (error: Exception | any) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async findAllPaginated(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const getAllAppointmentOperation = container.resolve(
        GetAllAppointmentOperation,
      )
      const { page, limit } = request.query as { page: number; limit: number }

      const appointmentMapper = container.resolve(AppointmentSerializer)
      const data = await getAllAppointmentOperation.execute(page, limit)

      const serializedAppointment = appointmentMapper.serializeMany(data.items)

      return reply.status(httpConstants.code.OK).send({
        ...data,
        items: serializedAppointment,
      })
    } catch (error: Exception | any) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const data = request.body as Partial<IRegisterAppointmentDTO>

      const updateCommand = new UpdateAppointmentCommand({
        id: new UniqueEntityId(id),
        ...data,
      })
      const updateAppointmentOperation = container.resolve(
        UpdateAppointmentOperation,
      )
      const appointmentMapper = container.resolve(AppointmentSerializer)

      const patient = await updateAppointmentOperation.execute(updateCommand)
      const serializedAppointment = appointmentMapper.serialize(patient)

      return reply.status(httpConstants.code.OK).send(serializedAppointment)
    } catch (error: Exception | any) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async findById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const getAppointmentOperation = container.resolve(GetAppointmentOperation)
      const appointmentMapper = container.resolve(AppointmentSerializer)

      const appointment = await getAppointmentOperation.execute(
        new UniqueEntityId(id),
      )
      const serializedAppointment = appointmentMapper.serialize(appointment)

      return reply.status(httpConstants.code.OK).send(serializedAppointment)
    } catch (error: Exception | any) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async cancelAppointment(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const cancelAppointmentOperation = container.resolve(
        CancelAppointmentOperation,
      )

      await cancelAppointmentOperation.execute(new UniqueEntityId(id))

      return reply
        .status(httpConstants.code.OK)
        .send({ message: httpConstants.message.OK })
    } catch (error: Exception | any) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }

  async completeAppointment(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const { id } = request.params as { id: string }
      const completeAppointmentOperation = container.resolve(
        CompleteAppointmentOperation,
      )

      await completeAppointmentOperation.execute(new UniqueEntityId(id))

      return reply
        .status(httpConstants.code.OK)
        .send({ message: httpConstants.message.OK })
    } catch (error: Exception | any) {
      if (error instanceof Exception) {
        return sendErrorResponse(reply, +error.error_code, error.message)
      }

      return sendErrorResponse(reply, 500, error.message)
    }
  }
}
