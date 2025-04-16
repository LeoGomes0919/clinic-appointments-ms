import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../persistence/typeorm/models/*.ts'],
  migrations: [__dirname + '/../persistence/typeorm/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
  subscribers: [],
})

const startDataSource = async () => {
  await AppDataSource.initialize()
}

export { AppDataSource, startDataSource }
