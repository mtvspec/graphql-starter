import gql from 'graphql-tag'

import { typeDefs as RequirementsTypeDefs, resolvers as RequirementsResolvers } from './requirements'

const RootTypeDefs = gql`

  type Query {
    name: String
  }

  type Mutation {
    name: String
  }

  schema {
    query: Query
    mutation: Mutation
  }

`

const typeDefs = [
  RootTypeDefs,
  RequirementsTypeDefs,
]

const resolvers = {
  ...RequirementsResolvers
}

export {
  typeDefs,
  resolvers
}
