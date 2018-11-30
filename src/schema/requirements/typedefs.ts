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

  input NewRequirementData {
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

  input NewSourceData {
    type: Int!
    source: String!
  }

  type RequirementsConnection {
    totalCount: Int!
    requirements: [Requirement!]
  }

  type RequirementEdge {
    node: Requirement!
  }

  input NewSourceOfTypeStakeholderData {
    requirement: ID!
    person: ID!
  }

  input NewRequirementSourceData {
    requirement: ID!
    source: ID!
  }

  extend type Mutation {
    createRequirement(input: NewRequirementData!): Requirement!
    updateRequirement(id: ID! input: NewRequirementData!): Requirement!
    deleteRequirement(id: ID!): Requirement!
  }

`
