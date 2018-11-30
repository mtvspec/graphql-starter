import * as knex from 'knex'

const PUBLIC_HOST: string = '127.0.0.1'
const PUBLIC_PORT: number = 5432

export const db = knex({
  client: 'pg',
  connection: {
    host: PUBLIC_HOST,
    database: 'mtvspec',
    user: 'postgres',
    password: 'postgres',
    port: PUBLIC_PORT
  },
  debug: false
})
