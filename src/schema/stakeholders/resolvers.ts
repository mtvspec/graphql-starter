import { dataBaseService } from '../../services/database.service'

const STAKEHOLDER_TABLE_NAME: string = 'stakeholder'

export const resolvers = {
  Query: {
    allStakeholders: (obj, { orderBy = 'id' }, ctx, info) => {
      return dataBaseService.getNodes({
        tableName: STAKEHOLDER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy,
      })
    },
    stakeholder: (obj, { id }, ctx, info) => {
      return dataBaseService.getNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id }
      })
    },
  },
  Stakeholder: {
    person: ({ person }, args, ctx, info) => {
      return dataBaseService.getNode({
        tableName: 'person', // TODO: refactor this
        fields: ctx.requestedFields(info),
        target: { id: person }
      })
    },
  },
  Mutation: {
    createStakeholder: (obj, { data }, ctx, info) => {
      return dataBaseService.createNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updateStakeholder: (obj, { id, data }, ctx, info) => {
      return dataBaseService.updateNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteStakeholder: (obj, { id }, ctx, info) => {
      return dataBaseService.deleteNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
  }
}