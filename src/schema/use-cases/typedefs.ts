import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allUseCases: [UseCase!]
    useCase(id: ID!): UseCase!
  }

  type UseCase {
    id: ID!
    code: String!
    name: String!
    briefDescription: String
  }

  input NewUseCaseData {
    name: String!
    briefDescription: String
  }

  type Actor {
    id: ID!
    useCase: UseCase!
    name: String!
    description: String
    type: ActorType!
  }

  type ActorType {
    id: ID!
    name: String!
    description: String
  }

  input NewActorData {
    useCase: ID!
    name: String!
    description: String
    type: ID!
  }

  type Flow {
    id: ID!
    useCase: UseCase!
    preconditions: [Precondition!]
    type: FlowType!
    name: String!
    description: String
    postconditions: [Postcondition!]
  }

  input NewFlowData {
    useCase: ID!
    name: String!
    description: String
  }

  type Precondition {
    id: ID!
    flow: Flow!
    code: String!
    name: String!
    description: String
  }

  input NewPrecodition {
    flow: ID!
    name: String!
    description: String
  }

  type Postcondition {
    id: ID!
    flow: Flow!
    code: String!
    name: String!
    description: String
  }

  input NewPostcondition {
    flow: ID!
    name: String!
    description: String
  }

  type UseCaseSlice {
    id: ID!
    useCase: UseCase!
    code: String!
    name: String!
    description: String
  }

  input NewUseCaseSlice {
    useCase: ID!
    name: String!
    description: String
  }

  extend type Mutation {
    createUseCase(input: NewUseCaseData!): UseCase!
    updateUseCase(id: ID! input: NewUseCaseData!): UseCase!
    deleteUseCase(id: ID!): UseCase!
    createActor(input: NewActorData!): Actor!
    updateActor(id: ID! input: NewActorData!): Actor!
    deleteActor(id: ID!): Actor!
  }

`
