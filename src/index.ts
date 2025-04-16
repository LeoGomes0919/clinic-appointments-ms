import 'reflect-metadata'
import * as dotenv from 'dotenv'
import '@/shared/container'
import { start, app } from '@/interfaces/http/server'
import { startDataSource } from './infra/config/dataSource'

dotenv.config()

start()
  .then(() => {
    startDataSource()
      .then(() => app.log.info('Database initialized'))
      .catch((err) => {
        app.log.error(err, 'Error initializing database')
        process.exit(1)
      })
  })
  .catch((err) => {
    app.log.error(err, 'Error starting server')
    process.exit(1)
  })
