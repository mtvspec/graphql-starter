import gql from 'graphql-tag'

export const typeDefs = gql`

  extend type Query {
    allSystems(
      orderBy: SystemOrderByFields
    ): [System!]
    system(id: ID!): System!
    allSystemComponents(
      orderBy: SystemComponentOrderByFields
    ): [SystemComponent!]
    systemComponent: SystemComponent!
  }

  type System {
    id: ID!
    name: String!
    description: String
    systemComponents: [SystemComponent!]
  }

  enum SystemOrderByFields {
    id
    name
    description
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

  enum SystemComponentOrderByFields {
    id
    name
    description
  }

  input NewSystemComponentData {
    system: ID!
    name: String!
    description: String
  }

  extend type Mutation {
    createSystem(data: NewSystemData!): System!
    updateSystem(id: ID! data: NewSystemData!): System!
    deleteSystem(id: ID!): System!
    createSystemComponent(data: NewSystemComponentData!): SystemComponent!
    updateSystemComponent(id: ID! data: NewSystemComponentData!): SystemComponent!
    deleteSystemComponent(id: ID!): SystemComponent!
  }

`