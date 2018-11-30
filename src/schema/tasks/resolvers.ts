import { dataBaseService } from "../../services/database.service"

const TASK_TABLE_NAME: string = 'task'
const TASK_ASSIGNEE_TABLE_NAME: string = 'task_assignee'

export const resolvers = {
  Query: {
    allTasks: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TASK_TABLE_NAME,
        fields: Object.keys(ctx.selectionSet(info)),
        orderBy: 'id',
      })
    },
    task: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TASK_TABLE_NAME,
        fields: Object.keys(ctx.selectionSet(info)),
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
        tableName: TASK_TABLE_NAME,
        fields: Object.keys(ctx.selectionSet(info)),
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
        tableName: TASK_TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateTask: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TASK_TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteTask: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TASK_TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    setAssignee: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TASK_ASSIGNEE_TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    unsetAssignee: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TASK_ASSIGNEE_TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    }
  }
}
