import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allUsers: [User!]
    user(id: ID!): User!
  }

  type User {
    id: ID!
    person: Person!
    username: String!
    email: String
  }

  input NewUserInput {
    person: ID!
    username: String!
    password: String!
    email: String
  }

  input UpdateUserInput {
    email: String
  }

  extend type Mutation {
    createUser(input: NewUserInput!): User!
    updateUser(id: ID! input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }

`
