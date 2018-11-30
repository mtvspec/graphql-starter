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

  input NewProjectData {
    customer: ID!
    title: String!
    description: String
  }

  type ProjectMember {
    id: ID!
    project: Project!
    user: User!
  }

  input NewProjectMemberData {
    project: ID!
    user: ID!
  }

  extend type Mutation {
    createProject(input: NewProjectData!): Project!
    updateProject(id: ID! input: NewProjectData!): Project!
    deleteProject(id: ID!): Project!
    createProjectMember(input: NewProjectMemberData!): ProjectMember!
    updateProjectMember(id: ID! input: NewProjectMemberData!): ProjectMember!
    deleteProjectMember(id: ID!): ProjectMember!
  }

`
