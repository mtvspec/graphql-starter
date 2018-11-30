import gql from 'graphql-tag'

export const typeDefs = gql`

  extend type Query {
    allStatements: [Statement!]
    statement: Statement!
  }

  type Statement {
    id: ID!
    stakeholder: Stakeholder!
    type: StatementType!
    title: String!
    description: String
  }

  input NewStatementData {
    stakeholder: ID!
    type: ID!
    title: String!
    description: String
  }

  type StatementType {
    id: ID!
    name: String!
    description: String
  }

  extend type Mutation {
    createStatement(input: NewStatementData!): Statement!
    updateStatement(id: ID! input: NewStatementData!): Statement!
    deleteStatement(id: ID!): Statement!
  }

`
