import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allRequirements: [Requirement!]
    requirement(id: ID!): Requirement!
  }

  type Requirement {
    id: ID!
    requirementSource: RequirementSource
    title: String!
    description: String
  }

  type RequirementSource {
    id: ID!
    source: USource!
  }

  union USource = Stakeholder | Source

  type Source {
    id: ID!
    source: String!
  }

  type Stakeholder {
    id: ID!
    person: Person!
  }

  type Person {
    id: ID!
    firstName: String!
    lastName: String
    middleName: String
  }

`
