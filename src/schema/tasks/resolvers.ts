import { dataBaseService } from "../../services/database.service"

// TODO: refactor
const TASK_TABLE_NAME: string = 'task'
const TASK_ASSIGNEE_TABLE_NAME: string = 'task_assignee'
const PROJECT_MEMBER_TABLE_NAME: string = 'project_member'

export const resolvers = {
  Query: {
    allTasks: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TASK_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy,
      })
    },
    task: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TASK_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id },
      })
    },
    allAssignees: async (obj, { orderBy = 'id' }, ctx, info) => {
      return await dataBaseService.getNodes({
        tableName: TASK_ASSIGNEE_TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy,
      })
    },
    assignee: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TASK_ASSIGNEE_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id },
      })
    }
  },
  Assignee: {
    task: async ({ task }, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TASK_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: task },
      })
    },
    assignee: async ({ assignee }, args, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: PROJECT_MEMBER_TABLE_NAME,
        fields: ctx.requestedFields(info),
        target: { id: assignee },
      })
    }
  },
  Mutation: {
    createTask: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TASK_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updateTask: async (obj, { id, data }, ctx, info) => {
      return await dataBaseService.updateNode({
        tableName: TASK_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteTask: async (obj, { id }, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TASK_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    setAssignee: async (obj, { data }, ctx, info) => {
      return await dataBaseService.createNode({
        tableName: TASK_ASSIGNEE_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    unsetAssignee: async (obj, { id }, ctx, info) => {
      return await dataBaseService.deleteNode({
        tableName: TASK_ASSIGNEE_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    }
  }
}
