import gql from 'graphql-tag'

import { typeDefs as PersonTypeDefs, resolvers as PersonResolvers } from './persons'
import { typeDefs as ProjectTypeDefs, resolvers as ProjectResolvers } from './projects'
import { typeDefs as CustomerTypeDefs, resolvers as CustomerResolvers } from './customers'
import { typeDefs as StakeholderTypeDefs, resolvers as StakeholderResolvers } from './stakeholders'
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
  PersonTypeDefs,
  StakeholderTypeDefs,
  ProjectTypeDefs,
  CustomerTypeDefs,
  RequirementsTypeDefs,
]

const resolvers = {
  ...PersonResolvers,
  ...StakeholderResolvers,
  ...ProjectResolvers,
  ...CustomerResolvers,
  ...RequirementsResolvers,
  Query: {
    ...PersonResolvers.Query,
    ...StakeholderResolvers.Query,
    ...ProjectResolvers.Query,
    ...CustomerResolvers.Query,
    ...RequirementsResolvers.Query,
  },
  Mutation: {
    ...PersonResolvers.Mutation,
    ...StakeholderResolvers.Mutation,
    ...ProjectResolvers.Mutation,
    ...CustomerResolvers.Mutation,
    ...RequirementsResolvers.Mutation,
  }
}

console.log(resolvers);



export {
  typeDefs,
  resolvers
}
