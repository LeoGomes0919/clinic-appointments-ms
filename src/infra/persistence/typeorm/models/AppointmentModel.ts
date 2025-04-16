import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { EnumStatusAppointment } from '@/domain/enums/EnumStatusAppointment'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

@Entity('appointments')
export class AppointmentModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ name: 'patient_id', type: 'uuid', nullable: false })
  patientId: string

  @Column({ name: 'doctor_id', type: 'uuid', nullable: false })
  doctorId: string

  @Column({ name: 'appointment_date', type: 'timestamp', nullable: false })
  appointmentDate: Date

  @Column({ type: 'enum', enum: EnumStatusAppointment, nullable: false })
  status: EnumStatusAppointment

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null

  constructor() {
    if (!this.id) {
      this.id = new UniqueEntityId().toString()
    }
  }
}
