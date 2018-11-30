import { dataBaseService } from "../../services/database.service"

// TODO: refactor
const PROJECT_TABLE_NAME: string = 'project'
const PROJECT_MEMBER_TABLE_NAME: string = 'project_member'
const CUSTOMER_TABLE: string = 'customer'
const USER_TABLE_NAME: string = 'user'

export const resolvers = {
  Query: {
    allProjects: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: PROJECT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy
      })
    },
    project: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: PROJECT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id }
      })
    },
    allProjectMembers: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: PROJECT_MEMBER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy,
      })
    }
  },
  Project: {
    customer: async ({ customer }, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: CUSTOMER_TABLE,
        fields: ctx.requestedFields(info),
        target: { id: customer }
      })
    },
  },
  ProjectMember: {
    project: async ({ project }, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: PROJECT_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: project }
      })
    },
    user: async ({ user }, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: USER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: user }
      })
    }
  },
  Mutation: {
    createProject: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: PROJECT_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updateProject: async (obj, { id, data }, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: PROJECT_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteProject: async (obj, { id }, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: PROJECT_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    createProjectMember: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: PROJECT_MEMBER_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    }
  }
}
