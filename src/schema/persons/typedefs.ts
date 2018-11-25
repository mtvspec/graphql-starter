import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allPersons: [Person!]
    person(id: ID!): Person!
  }

  type Person {
    id: ID!
    firstName: String!
    lastName: String
    middleName: String
    dob: String
  }

  input NewPersonInput {
    firstName: PersonFirstName!
    lastName: String
    middleName: String
    dob: String
  }

  scalar PersonFirstName

  extend type Mutation {
    createPerson(input: NewPersonInput!): Person!
    updatePerson(id: ID! input: NewPersonInput!): Person!
    deletePerson(id: ID!): Person!
  }

`
