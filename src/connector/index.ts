import * as knex from 'knex'

const PUBLIC_HOST: string = '88.204.167.206'
const PUBLIC_PORT: number = 231

export const db = knex({
  client: 'pg',
  connection: {
    host: PUBLIC_HOST,
    database: 'gis',
    user: 'abzal',
    password: 'abzal123',
    port: PUBLIC_PORT
  },
  debug: false
})
