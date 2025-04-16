import { DataSource, Repository } from 'typeorm'
import { Constructor } from './RepositoryTypes'
import { UniqueEntityId } from '@/domain/value-objects/UniqueEntityId'

export abstract class BaseRepository<TDomain, TPersistence> {
  protected ormRepository: Repository<TPersistence>

  constructor(entityClas: Constructor<TPersistence>, dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(entityClas)
  }

  protected abstract toDomain(persistenceEntity: TPersistence): TDomain

  protected abstract toPersistence(domainEntity: TDomain): TPersistence

  async create(domainEntity: TDomain): Promise<TDomain> {
    const persistenceEntity = this.toPersistence(domainEntity)
    const createdEntity = await this.ormRepository.save(persistenceEntity)
    return this.toDomain(createdEntity)
  }

  async delete(id: UniqueEntityId): Promise<void> {
    await this.ormRepository.delete(id.toString())
  }

  async findById(id: UniqueEntityId): Promise<TDomain | null> {
    const persistenceEntity = await this.ormRepository.findOneBy({
      id: id.toString(),
    } as any)
    if (!persistenceEntity) {
      return null
    }
    return this.toDomain(persistenceEntity)
  }
}
