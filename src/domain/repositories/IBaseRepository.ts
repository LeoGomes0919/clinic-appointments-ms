import { UniqueEntityId } from '../value-objects/UniqueEntityId'

export interface IPaginationProps<T> {
  items: T[]
  total: number
  pages: number
  current: number
}

export interface IBaseRepository<T> {
  create(entity: T): Promise<T>
  update(id: UniqueEntityId, entity: Partial<T>): Promise<T>
  delete(id: UniqueEntityId): Promise<void>
  findById(id: UniqueEntityId): Promise<T | null>
  findAllPaginated(page: number, limit: number): Promise<IPaginationProps<T>>
  findAll(): Promise<T[]>
}
