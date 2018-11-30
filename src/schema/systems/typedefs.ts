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

  input NewSystemData {
    name:  String!
    description: String
  }

  type SystemComponent {
    id: ID!
    system: System!
    name: String!
    description: String
  }

  input NewSystemComponentData {
    system: ID!
    name: String!
    description: String
  }

  extend type Mutation {
    createSystem(input: NewSystemData!): System!
    updateSystem(id: ID! input: NewSystemData!): System!
    deleteSystem(id: ID!): System!
    createSystemComponent(input: NewSystemComponentData!): SystemComponent!
    updateSystemComponent(id: ID! input: NewSystemComponentData!): SystemComponent!
    deleteSystemComponent(id: ID!): SystemComponent!
  }

`