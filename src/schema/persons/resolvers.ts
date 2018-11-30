import { dataBaseService } from '../../services/database.service'

const PERSON_TABLE_NAME: string = 'person'

export const resolvers = {
  Query: {
    allPersons: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: PERSON_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy,
      })
    },
    person: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: PERSON_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id }
      })
    },
  },
  Mutation: {
    createPerson: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: PERSON_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updatePerson: async (obj, { id, data }, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: PERSON_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deletePerson: async (obj, { id }, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: PERSON_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    }
  }
}
