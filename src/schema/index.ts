import gql from 'graphql-tag'

import { typeDefs as PersonTypeDefs, resolvers as PersonResolvers } from './persons'
import { typeDefs as UserTypeDefs, resolvers as UserResolvers } from './users'
import { typeDefs as ProjectTypeDefs, resolvers as ProjectResolvers } from './projects'
import { typeDefs as CustomerTypeDefs, resolvers as CustomerResolvers } from './customers'
import { typeDefs as StakeholderTypeDefs, resolvers as StakeholderResolvers } from './stakeholders'
import { typeDefs as RequirementsTypeDefs, resolvers as RequirementsResolvers } from './requirements'
import { typeDefs as TaskTypeDefs, resolvers as TaskResolvers } from './tasks'
import { typeDefs as SystemTypeDefs, resolvers as SystemResolvers } from './systems'
import { typeDefs as StatementTypeDefs, resolvers as StatementResolvers } from './statements'

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
  UserTypeDefs,
  StakeholderTypeDefs,
  ProjectTypeDefs,
  CustomerTypeDefs,
  RequirementsTypeDefs,
  TaskTypeDefs,
  SystemTypeDefs,
  StatementTypeDefs,
]

const resolvers = {
  ...PersonResolvers,
  ...UserResolvers,
  ...StakeholderResolvers,
  ...ProjectResolvers,
  ...CustomerResolvers,
  ...RequirementsResolvers,
  ...TaskResolvers,
  ...SystemResolvers,
  ...StakeholderResolvers,
  Query: {
    ...PersonResolvers.Query,
    ...UserResolvers.Query,
    ...StakeholderResolvers.Query,
    ...ProjectResolvers.Query,
    ...CustomerResolvers.Query,
    ...RequirementsResolvers.Query,
    ...TaskResolvers.Query,
    ...SystemResolvers.Query,
    ...StatementResolvers.Query,
  },
  Mutation: {
    ...PersonResolvers.Mutation,
    ...UserResolvers.Mutation,
    ...StakeholderResolvers.Mutation,
    ...ProjectResolvers.Mutation,
    ...CustomerResolvers.Mutation,
    ...RequirementsResolvers.Mutation,
    ...TaskResolvers.Mutation,
    ...SystemResolvers.Mutation,
    ...StatementResolvers.Mutation,
  }
}

export {
  typeDefs,
  resolvers
}
