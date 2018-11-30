import { dataBaseService } from "../../services/database.service"

const TABLE_NAME: string = 'task'

export const resolvers = {
  Query: {
    allTasks: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy: 'id',
      })
    },
    task: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: args.id },
      })
    },
    allAssignees: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: 'task_assignee',
        fields: ctx.requestedFields(info),
        orderBy: args.orderBy || 'id',
      })
    },
    assignee: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'task_assignee',
        fields: ctx.requestedFields(info),
        target: { id: args.id },
      })
    }
  },
  Assignee: {
    task: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'task',
        fields: ctx.requestedFields(info),
        target: { id: obj.task },
      })
    },
    assignee: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'project_member',
        fields: ctx.requestedFields(info),
        target: { id: obj.assignee },
      })
    }
  },
  Mutation: {
    createTask: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateTask: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteTask: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    setAssignee: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: 'task_assignee',
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    unsetAssignee: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: 'task_assignee',
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    }
  }
}
