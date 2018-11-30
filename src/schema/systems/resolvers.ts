import { dataBaseService } from '../../services/database.service'

const TABLE_NAME: string = 'system'
const SYSTEM_COMPONENT_TABLE_NAME = 'system_component'

export const resolvers = {
  Query: {
    allSystems: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: ['id', 'name', 'description'], // TODO: refactor this
        orderBy: args.orderBy || 'id',
      })
    },
    system: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ['id', 'name', 'description'], // TODO: refactor this
        target: { id: args.id },
      })
    },
    allSystemComponents: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy: args.orderBy || 'id',
      })
    },
    systemComponent: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: args.id },
      })
    },
  },
  System: {
    systemComponents: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodesByTarget({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { system: obj.id },
        orderBy: args.orderBy || 'id'
      })
    }
  },
  SystemComponent: {
    system: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: obj.system }
      })
    }
  },
  Mutation: {
    createSystem: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateSystem: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteSystem: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    createSystemComponent: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateSystemComponent: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteSystemComponent: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
  }
}
