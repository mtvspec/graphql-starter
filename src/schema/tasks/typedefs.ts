import gql from "graphql-tag"

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

  input NewTaskData {
    title: String!
    description: String
  }

  type Assignee {
    id: ID!
    task: Task!
    assignee: ProjectMember!
  }

  input NewAssigneeData {
    task: ID!
    assignee: ID!
  }

  extend type Mutation {
    createTask(data: NewTaskData!): Task!
    updateTask(id: ID! data: NewTaskData!): Task!
    deleteTask(id: ID!): Task!
    setAssignee(data: NewAssigneeData!): Assignee!
    unsetAssignee(id: ID!): Assignee!
  }

`
