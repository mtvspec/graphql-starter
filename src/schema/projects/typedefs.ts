import gql from 'graphql-tag'

export const typeDefs = gql`

  extend type Query {
    allProjects(
      orderBy: ProjectOrderByFields
    ): [Project!]
    project(id: ID!): Project!
    allProjectMembers: [ProjectMember!]
  }

  type Project {
    id: ID!
    customer: Customer!
    title: String!
    description: String
  }

  enum ProjectOrderByFields {
    id
    title
    description
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
    createProject(data: NewProjectData!): Project!
    updateProject(id: ID! data: NewProjectData!): Project!
    deleteProject(id: ID!): Project!
    createProjectMember(data: NewProjectMemberData!): ProjectMember!
    updateProjectMember(id: ID! data: NewProjectMemberData!): ProjectMember!
    deleteProjectMember(id: ID!): ProjectMember!
  }

`
