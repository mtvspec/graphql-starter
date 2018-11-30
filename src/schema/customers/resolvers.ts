import { dataBaseService } from "../../services/database.service"

const CUSTOMER_TABLE_NAME: string = 'customer'

export const resolvers = {
  Query: {
    allCustomers: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: CUSTOMER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy,
      })
    },
    customer: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: CUSTOMER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id }
      })
    },
  },
  Mutation: {
    createCustomer: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: CUSTOMER_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updateCustomer: async (obj, { id, data }, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: CUSTOMER_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteCustomer: async (obj, { id }, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: CUSTOMER_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
  }
}
