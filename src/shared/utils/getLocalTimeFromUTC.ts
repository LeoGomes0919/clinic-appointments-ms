import { toZonedTime } from 'date-fns-tz'
import { getHours, getMinutes } from 'date-fns'

/**
 * @param isoDate - Data em formato ISO (ex: '2025-04-24T10:00:00.000Z')
 * @returns { hour: number, minute: number }
 */
export function getLocalTimeFromUTC(isoDate: string): {
  hour: number
  minute: number
} {
  const timeZone = 'America/Sao_Paulo'
  const zonedDate = toZonedTime(isoDate.replace(/Z$/, ''), timeZone)

  return {
    hour: getHours(zonedDate),
    minute: getMinutes(zonedDate),
  }
}
