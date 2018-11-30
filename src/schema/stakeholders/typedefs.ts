import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allStakeholders: [Stakeholder!]
    stakeholder(id: ID!): Stakeholder!
  }

  type Stakeholder {
    id: ID!
    person: Person!
    statements: [Statement!]
  }

  input NewStakeholderInput {
    person: ID!
  }

  extend type Mutation {
    createStakeholder(input: NewStakeholderInput!): Stakeholder!
    updateStakeholder(id: ID! input: NewStakeholderInput!): Stakeholder!
    deleteStakeholder(id: ID!): Stakeholder!
  }

`
