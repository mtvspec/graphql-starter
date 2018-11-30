import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allComments: [Comment!]
    comment: Comment!
  }

  type Comment {
    id: ID!
    author: User!
    comment: String!
  }

  input NewCommentData {
    author: ID!
    comment: String!
  }

  extend type Mutation {
    createComment(input: NewCommentData!): Comment!
    updateComment(id: ID! input: NewCommentData!): Comment!
    deleteComment(id: ID!): Comment!
  }

`
