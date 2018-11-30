import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allBoards: [Board!]
    board(id: ID!): Board!
    allList: [List!]
    list(id: ID!): List!
    allCards: [Card!]
    card(id: ID!): Card!
  }

  type Board {
    id: ID!
    name: String!
    description: String
  }

  input NewBoardData {
    name: String!
    description: String
  }

  type List {
    id: ID!
    board: Board!
    name: String!
    color: String!
    cards: [Card!]
  }

  input NewListData {
    board: ID!
    name: String!
    color: String
  }

  type Card {
    id: ID!
    list: List!
    title: String!
    description: String
    order: Int!
  }

  input NewCardData {
    list: ID!
    title: String
    description: String
    order: Int!
  }

  extend type Mutation {
    createBoard(input: NewBoardData!): Board!
    updateBoard(id: ID! input: NewBoardData!): Board!
    deleteBoard(id: ID!): Board!
    createList(input: NewListData!): List!
    updateList(id: ID! input: NewListData!): List!
    deleteList(id: ID!): List!
    createCard(input: NewCardData!): Card!
    updateCard(id: ID! input: NewCardData!): Card!
    deleteCard(id: ID!): Card!
  }

`
