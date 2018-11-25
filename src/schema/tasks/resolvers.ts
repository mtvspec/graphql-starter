import { dataBaseService } from "../../services/database.service"

const TABLE_NAME: string = 'task'

export const resolvers = {
  Query: {
    allTasks: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: Object.keys(ctx.selectionSet(info)),
        orderBy: 'id',
      })
    },
    task: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: Object.keys(ctx.selectionSet(info)),
        target: { id: args.id },
      })
    },
    allAssignees: async (obj, args, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: 'task_assignee',
        fields: Object.keys(ctx.selectionSet(info)),
        orderBy: 'id',
      })
    },
    assignee: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'task_assignee',
        fields: Object.keys(ctx.selectionSet(info)),
        target: { id: args.id },
      })
    }
  },
  Assignee: {
    task: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'task',
        fields: Object.keys(ctx.selectionSet(info)),
        target: { id: obj.task },
      })
    },
    assignee: async (obj, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: 'project_member',
        fields: Object.keys(ctx.selectionSet(info)),
        target: { id: obj.assignee },
      })
    }
  },
  Mutation: {
    createTask: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: Object.keys(ctx.selectionSet(info)),
      })
    },
    updateTask: async (obj, args, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: Object.keys(ctx.selectionSet(info)),
      })
    },
    deleteTask: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: Object.keys(ctx.selectionSet(info)),
      })
    },
    setAssignee: async (obj, args, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: 'task_assignee',
        data: args.input,
        returning: Object.keys(ctx.selectionSet(info)),
      })
    },
    unsetAssignee: async (obj, args, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: 'task_assignee',
        target: { id: args.id },
        returning: Object.keys(ctx.selectionSet(info)),
      })
    }
  }
}
