import { dataBaseService } from "../../services/database.service"

const TABLE_NAME: string = 'customer'

export const resolvers = {
  Query: {
    allCustomers: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy: args.orderBy || 'id'
      })
    },
    customer: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: args.id }
      })
    },
  },
  Mutation: {
    createCustomer: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateCustomer: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteCustomer: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
  }
}
