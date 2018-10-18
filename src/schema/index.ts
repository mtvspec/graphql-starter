import gql from 'graphql-tag'

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
]

const resolvers = {}

export {
  typeDefs,
  resolvers
}
