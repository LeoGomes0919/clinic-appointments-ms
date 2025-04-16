import bcrypt from 'bcrypt'
import { EnumMessage } from '@/domain/enums/EnumMessage'
import { BusinessException } from '@/domain/exceptions/BusinessException'

export async function hashGenerate(value: string): Promise<string> {
  try {
    const salt = 12
    const hash = await bcrypt.hash(value, salt)

    return hash
  } catch (error) {
    throw new BusinessException(EnumMessage.INTERNAL_SERVER_ERROR)
  }
}
