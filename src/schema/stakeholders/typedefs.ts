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

  input NewStakeholderData {
    person: ID!
  }

  extend type Mutation {
    createStakeholder(data: NewStakeholderData!): Stakeholder!
    updateStakeholder(id: ID! data: NewStakeholderData!): Stakeholder!
    deleteStakeholder(id: ID!): Stakeholder!
  }

`
