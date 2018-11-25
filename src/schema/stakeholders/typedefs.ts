import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allStakeholders: [Stakeholder!]
    stakeholder(id: ID!): Stakeholder!
  }

  type Stakeholder {
    id: ID!
    person: Person!
  }

  input NewStakeholderInput {
    person: ID!
  }

  extend type Mutation {
    createStakeholder(input: NewStakeholderInput!): Stakeholder!
  }


`