import { dataBaseService } from '../../services/database.service'

const SYSTEM_TABLE_NAME: string = 'system'
const SYSTEM_COMPONENT_TABLE_NAME = 'system_component'

export const resolvers = {
  Query: {
    allSystems: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: SYSTEM_TABLE_NAME,
        fields: ['id', 'name', 'description'], // TODO: refactor this (systemComponents - derived field)
        orderBy,
      })
    },
    system: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: SYSTEM_TABLE_NAME,
        fields: ['id', 'name', 'description'], // TODO: refactor this (systemComponents - derived field)
        target: { id },
      })
    },
    allSystemComponents: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy,
      })
    },
    systemComponent: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id },
      })
    },
  },
  System: {
    systemComponents: async ({ id }, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodesByTarget({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { system: id },
        orderBy,
      })
    }
  },
  SystemComponent: {
    system: async ({ system }, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: SYSTEM_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: system }
      })
    }
  },
  Mutation: {
    createSystem: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: SYSTEM_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updateSystem: async (obj, { id, data }, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: SYSTEM_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteSystem: async (obj, { id }, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: SYSTEM_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    createSystemComponent: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updateSystemComponent: async (obj, { id, data }, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteSystemComponent: async (obj, { id }, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: SYSTEM_COMPONENT_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
  }
}
