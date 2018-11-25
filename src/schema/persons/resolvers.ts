import { dataBaseService } from '../../services/database.service'

const TABLE_NAME: string = 'person'

export const resolvers = {
  Query: {
    allPersons: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: Object.keys(ctx.selectionSet(info)),
        orderBy: args.orderBy || 'id'
      })
    },
    person: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: Object.keys(ctx.selectionSet(info)),
        target: { id: args.id }
      })
    },
  },
  Mutation: {
    createPerson: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: Object.keys(ctx.selectionSet(info))
      })
    },
    updatePerson: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: Object.keys(ctx.selectionSet(info))
      })
    },
    deletePerson: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: Object.keys(ctx.selectionSet(info))
      })
    }
  }
}
