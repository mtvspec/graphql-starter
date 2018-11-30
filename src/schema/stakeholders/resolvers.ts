import { dataBaseService } from '../../services/database.service'

const STAKEHOLDER_TABLE_NAME: string = 'stakeholder'

export const resolvers = {
  Query: {
    allStakeholders: (obj, args, ctx, info) => {
      return dataBaseService.getNodes({
        tableName: STAKEHOLDER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy: args.orderBy || 'id'
      })
    },
    stakeholder: (obj, args, ctx, info) => {
      return dataBaseService.getNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: args.id }
      })
    },
  },
  Stakeholder: {
    person: (obj, args, ctx, info) => {
      return dataBaseService.getNode({
        tableName: 'person',
        fields: ctx.requestedFields(info),
        target: { id: obj.person }
      })
    },
  },
  Mutation: {
    createStakeholder: (obj, args, ctx, info) => {
      return dataBaseService.createNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateStakeholder: (obj, args, ctx, info) => {
      return dataBaseService.updateNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteStakeholder: (obj, args, ctx, info) => {
      return dataBaseService.deleteNode({
        tableName: STAKEHOLDER_TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
  }
}