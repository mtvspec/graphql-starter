import gql from "graphql-tag"

export const typeDefs = gql`

  extend type Query {
    allCustomers(
      orderBy: CustomerOrderFields
    ): [Customer!]
    customer(id: ID!): Customer!
  }

  type Customer {
    id: ID!
    name: String!
    description: String
  }

  enum CustomerOrderFields {
    id
    name
    description
  }

  input NewCustomerData {
    name: String!
    description: String
  }

  extend type Mutation {
    createCustomer(data: NewCustomerData!): Customer!
    updateCustomer(id: ID! data: NewCustomerData!): Customer!
    deleteCustomer(id: ID!): Customer!
  }

`