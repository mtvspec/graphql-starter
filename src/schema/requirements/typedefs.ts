import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allRequirements: RequirementsConnection!
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
    source: USource
  }

  union USource = Stakeholder | Source

  type Source {
    id: ID!
    source: String!
  }

  type RequirementsConnection {
    totalCount: Int!
    requirements: [Requirement!]
  }

  type RequirementEdge {
    node: Requirement!
  }

  input NewRequirementInput {
    title: String!
    description: String
  }

  input NewSourceInput {
    type: Int!
    source: String!
  }

  input NewSourceOfTypeStakeholderInput {
    requirement: ID!
    person: ID!
  }

  extend type Mutation {
    createRequirement(input: NewRequirementInput!): Requirement!
    updateRequirement(id: ID! input: NewRequirementInput!): Requirement!
    deleteRequirement(id: ID!): Requirement!
  }

`
