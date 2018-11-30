import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allTags: [Tag!]
    tag(id: ID!): Tag!
  }

  type Tag {
    id: ID!
    name: String!
    description: String
    color: Int!
  }

  input NewTagData {
    name: String!
    description: String
    color: Int!
  }

  extend type Mutation {
    createTag(input: NewTagData!): Tag!
    updateTag(id: ID! input: NewTagData!): Tag!
    deleteTag(id: ID!): Tag!
  }

`
