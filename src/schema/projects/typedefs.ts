import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allProjects: [Project!]
    project(id: ID!): Project!
  }

  type Project {
    id: ID!
    customer: Customer!
    title: String!
    description: String
  }

  input NewProjectInput {
    customer: ID!
    title: String!
    description: String
  }

  extend type Mutation {
    createProject(input: NewProjectInput!): Project!
    updateProject(id: ID! input: NewProjectInput!): Project!
    deleteProject(id: ID!): Project!
  }

`