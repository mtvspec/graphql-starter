import { dataBaseService } from "../../services/database.service"

const TABLE_NAME: string = 'project'

export const resolvers = {
  Query: {
    allProjects: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy: args.orderBy || 'id'
      })
    },
    project: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: args.id }
      })
    },
    allProjectMembers: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: 'project_member',
        fields: ctx.requestedFields(info),
        orderBy: 'id'
      })
    }
  },
  Project: {
    customer: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'customer',
        fields: ctx.requestedFields(info),
        target: { id: obj.customer }
      })
    },
  },
  ProjectMember: {
    project: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: obj.project }
      })
    },
    user: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'user',
        fields: ctx.requestedFields(info),
        target: { id: obj.user }
      })
    }
  },
  Mutation: {
    createProject: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateProject: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteProject: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    createProjectMember: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: 'project_member',
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    }
  }
}
