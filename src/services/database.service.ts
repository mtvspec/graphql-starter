import { db } from "../connector"
import { UserInputError } from "apollo-server-core"

interface INodeQueryConfig {
  tableName: string
  schemaName?: string | 'public'
  target: object
  fields: string[]
}

interface INodesQueryConfig {
  tableName: string
  schemaName?: string | 'public'
  fields: string[]
  target?: object
  orderBy: string
}

interface ICreateNodeConfig {
  tableName: string
  schemaName?: string | 'public'
  data: any,
  returning?: string[]
}

interface IUpdateNodeConfig {
  tableName: string
  schemaName?: string | 'public'
  data: any
  target: object
  returning?: string[]
}

interface IDeleteNodeConfig {
  tableName: string
  schemaName?: string | 'public'
  target: object
  returning?: string[]
}

interface INodesCountQueryConfig {
  tableName: string
  schemaName?: string | 'public'
  countFieldName: string
  as: string
}

export class DatabaseService {
  private readonly db = db
  public async getNodes(config: INodesQueryConfig) {
    return await db(config.tableName).withSchema(config.schemaName)
      .select(config.fields)
      .orderBy(config.orderBy)
      .catch(e => {
        console.error(e)
        throw new Error('Items fetch failed')
      })
  }
  public async getNodesByTarget(config: INodesQueryConfig) {
    const target = config.target ? config.target : {}
    return await db(config.tableName).withSchema(config.schemaName)
      .select(config.fields)
      .orderBy(config.orderBy)
      .where(target)
      .catch(e => {
        console.log('Error');
        console.log(config);
        console.error(e)
        throw new Error('Items fetch failed')
      })
  }
  public async getNode(config: INodeQueryConfig) {
    return this.db(config.tableName).withSchema(config.schemaName)
      .select(config.fields)
      .where(config.target)
      .first()
      .catch(e => {
        console.error(e)
        throw new Error(`Item fetch failed'`)
      })
  }
  public async getNodesCount(config: INodesCountQueryConfig) {
    return await this.db(config.tableName).withSchema(config.schemaName)
      .count(`${config.countFieldName} as ${config.as}`)
      .first()
      .then(res => res[config.as])
      .catch(e => {
        console.error(e)
        throw new Error('Items count fetch failed')
      })
  }
  public async createNode(config: ICreateNodeConfig) {
    return await this.db(config.tableName).withSchema(config.schemaName)
      .insert(config.data)
      .returning(config.returning || '*')
      .then(res => res[0])
      .catch(e => {
        if (e.code === '23505') {
          throw new UserInputError('Item with provided data is exist')
        } else if (e.code === '23503') {
          throw new UserInputError('Connecting item with provided data is not exist')
        } else {
          console.error(e)
          throw new Error('Item create failed')
        }
      })
  }
  public async updateNode(config: IUpdateNodeConfig) {
    return await this.db(config.tableName).withSchema(config.schemaName)
      .update(config.data)
      .where(config.target)
      .returning(config.returning || '*')
      .then(res => {
        if (res.length === 0) {
          return new UserInputError('Item with provided ID not exist')
        } else {
          return res[0]
        }
      })
      .catch(e => {
        if (e.code === '23505') {
          throw new UserInputError('Item with provided data is exist')
        } else {
          console.error(e)
          throw new Error('Item create failed')
        }
      })
  }
  public async deleteNode(config: IDeleteNodeConfig) {
    return await this.db(config.tableName).withSchema(config.schemaName)
      .delete()
      .where(config.target)
      .returning(config.returning || '*')
      .then(res => {
        if (res.length === 0) {
          return new UserInputError('Item with provided ID not exist')
        } else {
          return res[0]
        }
      })
      .catch(e => {
        console.error(e)
        throw new Error('Item delete failed')
      })
  }
  public async fetchTableFields(tableName: string, schemaName?: string) {
    return this.db(tableName).withSchema(schemaName)
      .columnInfo()
      .then(res => Object.keys(res))
  }
}

export const dataBaseService = new DatabaseService()