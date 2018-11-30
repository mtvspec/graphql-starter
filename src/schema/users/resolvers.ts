import { dataBaseService } from '../../services/database.service'
import * as bcrypt from 'bcrypt'

const USER_TABLE_NAME: string = 'user'
const PERSON_TABLE_NAME: string = 'person'

export const resolvers = {
  Query: {
    allUsers: (obj, { orderBy = 'id' }, { requestedFields }, info) => {
      return dataBaseService.getNodes({
        tableName: USER_TABLE_NAME,
        fields: requestedFields(info),
        orderBy,
      })
    }
  },
  User: {
    person: ({ person }, args, { requestedFields }, info) => {
      return dataBaseService.getNode({
        tableName: PERSON_TABLE_NAME,
        fields: requestedFields(info),
        target: { id: person }
      })
    }
  },
  Mutation: {
    createUser: (obj, { data }, { requestedFields }, info) => {
      const password = bcrypt.hashSync(data.input.password, 10)
      data.input.password = password
      return dataBaseService.createNode({
        tableName: USER_TABLE_NAME,
        data,
        returning: requestedFields(info),
      })
    },
    updateUser: (obj, { id, data }, { requestedFields }, info) => {
      return dataBaseService.updateNode({
        tableName: USER_TABLE_NAME,
        data,
        target: { id },
        returning: requestedFields(info),
      })
    },
    deleteUser: (obj, { id }, { requestedFields }, info) => {
      return dataBaseService.deleteNode({
        tableName: USER_TABLE_NAME,
        target: { id },
        returning: requestedFields(info),
      })
    }
  }
}
