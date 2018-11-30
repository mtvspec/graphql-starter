import { dataBaseService } from '../../services/database.service'

const TABLE_NAME: string = 'person'

export const resolvers = {
  Query: {
    allPersons: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy: args.orderBy || 'id'
      })
    },
    person: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: args.id }
      })
    },
  },
  Mutation: {
    createPerson: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updatePerson: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deletePerson: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    }
  }
}
