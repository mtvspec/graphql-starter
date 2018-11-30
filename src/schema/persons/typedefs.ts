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

  input NewPersonData {
    firstName: PersonFirstName!
    lastName: String
    middleName: String
    dob: String
  }

  scalar PersonFirstName

  extend type Mutation {
    createPerson(input: NewPersonData!): Person!
    updatePerson(id: ID! input: NewPersonData!): Person!
    deletePerson(id: ID!): Person!
  }

`
