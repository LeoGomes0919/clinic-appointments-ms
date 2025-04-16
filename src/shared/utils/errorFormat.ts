interface IErrorWithMessage {
  message: string | ((...args: any[]) => string)
  error_code: string
}

const formatError = (error: IErrorWithMessage | string): IErrorWithMessage =>
  typeof error === 'string' ? { message: error, error_code: '' } : error

const formatErrorMessage = (error: IErrorWithMessage, params: any[]): string =>
  typeof error?.message === 'function'
    ? error.message(...params)
    : error.message

const formatErrorCode = (
  errorCode: string,
  defaultErrorCode: string,
): string => {
  if (errorCode && /-/.test(errorCode)) return errorCode

  return `${errorCode || defaultErrorCode}`
}

export { formatError, formatErrorMessage, formatErrorCode }
