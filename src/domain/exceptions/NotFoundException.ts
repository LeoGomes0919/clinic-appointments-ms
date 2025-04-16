import { Exception, IExceptionError } from './Exception'

const DEFAULT_ERROR_CODE = '404'
export class NotFoundException extends Exception {
  constructor(error: IExceptionError | string, ...params: any[]) {
    super(error, DEFAULT_ERROR_CODE, ...params)
    this.name = 'NotFoundException'
  }
}
