import {
  formatError,
  formatErrorCode,
  formatErrorMessage,
} from '@/shared/utils/errorFormat'

export interface IExceptionError {
  message: string | ((...args: any[]) => string)
  error_code: string
}
export class Exception extends Error {
  public error_code: string
  public params: any[]

  constructor(
    error: IExceptionError | string,
    defaultErrorCode: string,
    ...params: any[]
  ) {
    const err: IExceptionError = formatError(error)
    const message = formatErrorMessage(err, params)

    super(message)
    this.error_code = formatErrorCode(err.error_code, defaultErrorCode)
    this.params = params
  }
}
