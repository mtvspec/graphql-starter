import gql from 'graphql-tag'

export const typeDefs = gql`

  extend type Query {
    allSystems: [System!]
    system(id: ID!): System!
    allSystemComponents: [SystemComponent!]
    systemComponent: SystemComponent!
  }

  type System {
    id: ID!
    name: String!
    description: String
    systemComponents: [SystemComponent!]
  }

  input NewSystem {
    name:  String!
    description: String
  }

  type SystemComponent {
    id: ID!
    system: System!
    name: String!
    description: String
  }

  input NewSystemComponent {
    system: ID!
    name: String!
    description: String
  }

  extend type Mutation {
    createSystem(input: NewSystem!): System!
    updateSystem(id: ID! input: NewSystem!): System!
    deleteSystem(id: ID!): System!
    createSystemComponent(input: NewSystemComponent!): SystemComponent!
    updateSystemComponent(id: ID! input: NewSystemComponent!): SystemComponent!
    deleteSystemComponent(id: ID!): SystemComponent!
  }

`