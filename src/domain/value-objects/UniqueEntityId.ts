import { v4 as uuidv4 } from 'uuid'

export class UniqueEntityId {
  private readonly id: string

  toString(): string {
    return this.id
  }

  toValue(): string {
    return this.id
  }

  constructor(id?: string) {
    this.id = id ?? uuidv4()
  }
}
