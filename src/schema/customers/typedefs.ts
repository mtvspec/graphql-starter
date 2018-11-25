import gql from "graphql-tag";

export const typeDefs = gql`

  extend type Query {
    allCustomers: [Customer!]
    customer(id: ID!): Customer!
  }

  type Customer {
    id: ID!
    name: String!
    description: String
  }

  input NewCustomerInput {
    name: String!
    description: String
  }

  extend type Mutation {
    createCustomer(input: NewCustomerInput!): Customer!
  }

`