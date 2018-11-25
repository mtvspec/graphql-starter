import gql from "graphql-tag";

export const typeDefs = gql`

  extend type Query {
    allTasks: [Task!]
    task(id: ID!): Task!
    allAssignees: [Assignee!]
    assignee: Assignee!
  }

  type Task {
    id: ID!
    title: String!
    description: String
  }

  input NewTask {
    title: String!
    description: String
  }

  type Assignee {
    id: ID!
    task: Task!
    assignee: ProjectMember!
  }

  input NewAssignee {
    task: ID!
    assignee: ID!
  }

  extend type Mutation {
    createTask(input: NewTask!): Task!
    updateTask(id: ID! input: NewTask!): Task!
    deleteTask(id: ID!): Task!
    setAssignee(input: NewAssignee!): Assignee!
    unsetAssignee(id: ID!): Assignee!
  }

`
