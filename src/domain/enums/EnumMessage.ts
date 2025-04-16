import { Enum } from '@/shared/utils/enum'

export const EnumMessage = Enum({
  INVALID_TOKEN: 'Invalid token.',
  UNAUTHORIZED: 'Unauthorized.',
  INTERNAL_SERVER_ERROR: 'Internal server error.',
  HOLIDAY_API_ERROR: 'Holiday API error.',
  APPOINTMENT_DATE_PASSED:
    'It is not possible to schedule appointments for past dates or times.',
  APPOINTMENT_HOUR_INVALID:
    'Appointments must be scheduled between 08:00 and 18:00.',
  APPOINTMENT_ALREADY_EXISTS:
    'Appointment already exists for the selected date and time.',
  APPOINTMENT_CANCELED: 'This appointment has been cancelled.',
  APPOINTMENT_ALREADY_COMPLETED: 'This appointment has already been completed.',
  APPOINTMENT_COMPLETED: 'This appointment has already been completed.',
  APPOINTMENT_NOT_FOUND: 'Appointment not found.',
  HOLIDAY_DATE: 'Appointment date is a holiday.',
  DOCTOR_API_ERROR: 'Doctor API error.',
  DOCTOR_NOT_FOUND: 'Doctor not found.',
  PATIENT_API_ERROR: 'Patient API error.',
  PATIENT_NOT_FOUND: 'Patient not found.',
})
