import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allProjects(orderBy: String): [Project!]
    project(id: ID!): Project!
    allProjectMembers: [ProjectMember!]
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

  type ProjectMember {
    id: ID!
    project: Project!
    user: User!
  }

  input NewProjectMember {
    project: ID!
    user: ID!
  }

  extend type Mutation {
    createProject(input: NewProjectInput!): Project!
    updateProject(id: ID! input: NewProjectInput!): Project!
    deleteProject(id: ID!): Project!
    createProjectMember(input: NewProjectMember!): ProjectMember!
  }

`
