import { dataBaseService, DatabaseService } from '../../services/database.service'

const TABLE_NAME: string = 'requirement'

import { db } from './../../connector'

class RequirementService {
  private readonly tableName: string = 'requirement'
  private fields: Promise<string[]>
  constructor(private dataBaseService: DatabaseService) {
    this.fields = this.dataBaseService.fetchTableFields('requirement')
    console.log(this.fields);

  }
  public async fetchRequirements(fields, orderBy) {
    return await this.dataBaseService.getNodes({
      tableName: this.tableName,
      fields,
      orderBy
    })
  }
  public async fetchRequirement(config) {
    return await this.dataBaseService.getNode({
      tableName: this.tableName,
      fields: config.fields,
      target: config.target
    })
  }
}

const rs = new RequirementService(dataBaseService)

class RequirementResolverService {
  public static requirementSourceFieldResolver = async (obj, args, ctx, info) => {
    const source = await db('requirement_source')
      .where({ requirement: obj['id'] })
      .first()
      .catch(e => console.error(e))
    if (source) {
      return source
    } else {
      const stakeholder = await db('requirement_stakeholder')
        .where({ requirement: obj['id'] })
        .first()
        .catch(e => console.error(e))
      if (stakeholder) {
        return stakeholder
      }
    }
  }
  public static sourceFieldResolver = async (obj, args, ctx, info) => {
    if (obj.source) {
      const requirement_source = await db('source')
        .where({ id: obj.source })
        .first()
        .catch(e => console.error(e))
      if (requirement_source) {
        return requirement_source
      }
    } else if (obj.stakeholder) {
      const requirement_stakeholder = await db('stakeholder')
        .where({ id: obj.stakeholder })
        .first()
        .catch(e => console.error(e))
      if (requirement_stakeholder) {
        return requirement_stakeholder
      } else {
        return null
      }
    }
  }
}

export const resolvers = {
  Query: {
    allRequirements: () => ({}),
    requirement: async (obj, args, ctx, info) => {
      return await rs.fetchRequirement({
        fields: Object.keys(ctx.selectionSet(info)),
        target: { id: args.id }
      })
    },
  },
  Requirement: {
    requirementSource: async (obj, args, ctx, info) => {
      const source = await dataBaseService.getNode({
        tableName: 'requirement_source',
        fields: ['*'],
        target: { requirement: obj.id }
      })
      if (source) {
        return source
      } else {
        const stakeholder = await db('requirement_stakeholder')
          .where({ requirement: obj['id'] })
          .first()
          .catch(e => console.error(e))
        if (stakeholder) {
          return stakeholder
        }
      }
    },
  },
  RequirementSource: {
    source: RequirementResolverService.sourceFieldResolver
  },
  RequirementsConnection: {
    totalCount: () => {
      return dataBaseService.getNodesCount({
        tableName: TABLE_NAME,
        countFieldName: 'id',
        as: 'totalCount'
      })
    },
    requirements: (obj, args, ctx, info) => {
      return dataBaseService.getNodes({
        tableName: TABLE_NAME,
        fields: ['id', 'title', 'description'],
        orderBy: args.orderBy || 'id'
      })
    },
  },
  RequirementEdge: {
    node: (obj) => {
      return obj
    },
  },
  USource: {
    __resolveType(obj, args, ctx, info) {
      if (obj.person) {
        return 'Stakeholder'
      } else if (obj.source) {
        return 'Source'
      } else {
        return null
      }
    }
  },
  Mutation: {
    createRequirement: (obj, args, ctx, info) => {
      return dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: args.input,
        returning: Object.keys(ctx.selectionSet(info))
      })
    },
  }
}
