import { dataBaseService } from '../../services/database.service'
import * as bcrypt from 'bcrypt'

const TABLE_NAME: string = 'user'

export const resolvers = {
  Query: {
    allUsers: (obj, args, ctx, info) => {
      return dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: ctx.requestedFields(info),
        orderBy: 'id'
      })
    }
  },
  User: {
    person: (obj, args, ctx, info) => {
      return dataBaseService.getNode({
        tableName: 'person',
        fields: ctx.requestedFields(info),
        target: { id: obj.person }
      })
    }
  },
  Mutation: {
    createUser: (obj, args, ctx, info) => {
      const password = bcrypt.hashSync(args.input.password, 10)
      args.input.password = password
      return dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: ctx.requestedFields(info),
      })
    },
    updateUser: (obj, args, ctx, info) => {
      return dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: args.input,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteUser: (obj, args, ctx, info) => {
      return dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id: args.id },
        returning: ctx.requestedFields(info),
      })
    }
  }
}
