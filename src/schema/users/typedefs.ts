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

  input NewUserData {
    person: ID!
    username: String!
    password: String!
    email: String
  }

  input UpdatedUserData {
    email: String
  }

  extend type Mutation {
    createUser(input: NewUserData!): User!
    updateUser(id: ID! input: UpdatedUserData!): User!
    deleteUser(id: ID!): User!
  }

`
