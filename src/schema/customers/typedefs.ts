import gql from "graphql-tag"

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

  input NewCustomerData {
    name: String!
    description: String
  }

  extend type Mutation {
    createCustomer(input: NewCustomerData!): Customer!
    updateCustomer(id: ID! input: NewCustomerData!): Customer!
    deleteCustomer(id: ID!): Customer!
  }

`