import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allPersons(
      orderBy: PersonOrderByFields
    ): [Person!]
    person(id: ID!): Person!
  }

  type Person {
    id: ID!
    firstName: String!
    lastName: String
    middleName: String
    dob: String
  }

  enum PersonOrderByFields {
    id
    firstName
    lastName
    middleName
    dob
  }

  input NewPersonData {
    firstName: PersonFirstName!
    lastName: String
    middleName: String
    dob: String
  }

  scalar PersonFirstName

  extend type Mutation {
    createPerson(data: NewPersonData!): Person!
    updatePerson(id: ID! data: NewPersonData!): Person!
    deletePerson(id: ID!): Person!
  }

`
