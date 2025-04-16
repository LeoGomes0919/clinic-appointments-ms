import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'
import { EnumStatusAppointment } from '../enums/EnumStatusAppointment'

export class Appointment {
  private _id: UniqueEntityId
  private _doctorId: UniqueEntityId
  private _patientId: UniqueEntityId
  private _status: EnumStatusAppointment
  private _appointmentDate: Date
  private _createdAt?: Date
  private _updatedAt?: Date
  private _deletedAt?: Date | null

  constructor(
    doctorId: UniqueEntityId,
    patientId: UniqueEntityId,
    status: EnumStatusAppointment,
    appointmentDate: Date,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    id?: UniqueEntityId,
  ) {
    this._id = id || new UniqueEntityId()
    this._doctorId = doctorId
    this._patientId = patientId
    this._status = status
    this._appointmentDate = appointmentDate
    this._createdAt = createdAt || new Date()
    this._updatedAt = updatedAt || new Date()
    this._deletedAt = deletedAt || null
  }

  get id(): UniqueEntityId {
    return this._id
  }

  get doctorId(): UniqueEntityId {
    return this._doctorId
  }

  get patientId(): UniqueEntityId {
    return this._patientId
  }

  get status(): EnumStatusAppointment {
    return this._status
  }

  get appointmentDate(): Date {
    return this._appointmentDate
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  get deletedAt(): Date {
    return this._deletedAt
  }

  static create({
    doctorId,
    patientId,
    status,
    appointmentDate,
    createdAt,
    updatedAt,
    deletedAt,
    id,
  }: {
    doctorId: UniqueEntityId
    patientId: UniqueEntityId
    status: EnumStatusAppointment
    appointmentDate: Date
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    id?: UniqueEntityId
  }): Appointment {
    return new Appointment(
      doctorId,
      patientId,
      status,
      appointmentDate,
      createdAt,
      updatedAt,
      deletedAt,
      id,
    )
  }
}
