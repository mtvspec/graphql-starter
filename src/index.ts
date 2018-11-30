import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import * as knexLogger from 'knex-logger'
import { db } from './connector'
import { typeDefs, resolvers } from './schema'
import { GraphQLError } from 'graphql'
import * as selectionSet from 'graphql-fields'

// Require the module
import * as createGraphQLLogger from 'graphql-log'

// Create a logger
const logExecutions = createGraphQLLogger({
  prefix: 'resolvers.'
})

// Wrap your resolvers
logExecutions(resolvers)

const context = async ({ req, res }) => {

  console.log('-==============================================================-')
  console.log(req.method, '|', require('dateformat')(new Date(), 'HH:MM:ss dd-mm-yyyy'), 'Request End')
  console.log('-==============================================================-')
  console.log('\nOperation:\n\n', req.body.operationName || 'Not present\n')
  console.log('\nAuthentification Header:\n\n', req.headers['authorization'] || 'Not present\n')
  if (req.body.query) console.log('\nQuery:\n\n', req.body.query, '\n')
  if (req.body.variables) console.log('Variables:\n\n', req.body.variables, '\n')
  if (req.headers['authorization']) return { session: { token: req.headers['authorization'].substring(7) } }

  return {
    selectionSet,
    requestedFields: (ast) => {
      return Object.keys(selectionSet(ast))
    }
  }

}

const app = express()
app.use(knexLogger(db))
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: false,
  debug: true,
  formatError: error => {
    delete error.extensions.exception
    console.error(error)
    if (error instanceof GraphQLError) return error
    else return new Error('Error')
  }
})
app.use((req, res, next) => {
  console.log('-==============================================================-')
  console.log(res.statusCode, '|', require('dateformat')(new Date(), 'HH:MM:ss dd-mm-yyyy'), 'Request End')
  console.log('-==============================================================-')
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")

  next()
})
server.applyMiddleware({ app })
app.listen({ port: 3000 }), () => { console.log(`🚀 Server ready at http://localhost:3000`) }
