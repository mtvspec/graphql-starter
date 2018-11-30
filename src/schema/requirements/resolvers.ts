import { dataBaseService, DatabaseService } from '../../services/database.service'

const TABLE_NAME: string = 'requirement'

export const resolvers = {
  Query: {
    allRequirements: () => ({}),
    requirement: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: TABLE_NAME,
        fields: ['id', 'title', 'description'],
        target: { id },
      })
    },
  },
  Requirement: {
    requirementSource: async (obj, args, ctx, info) => {
      const source = await dataBaseService.getNode({
        tableName: 'requirement_source',
        fields: ['id', 'requirement', 'source'],
        target: { requirement: obj.id }
      })
      if (source) {
        return source
      } else {
        const stakeholder = await dataBaseService.getNode({
          tableName: 'requirement_stakeholder',
          fields: ['id', 'requirement', 'stakeholder'],
          target: { requirement: obj.id }
        })
        if (stakeholder) {
          return stakeholder
        }
      }
    },
  },
  RequirementSource: {
    source: async (obj, args, ctx, info) => {
      if (obj.source) {
        const requirement_source = await dataBaseService.getNode({
          tableName: 'source',
          fields: ['id', 'source'],
          target: { id: obj.source }
        })
        if (requirement_source) {
          return requirement_source
        }
      } else if (obj.stakeholder) {
        const requirement_stakeholder = await dataBaseService.getNode({
          tableName: 'stakeholder',
          fields: ['id', 'person'],
          target: { id: obj.stakeholder }
        })
        if (requirement_stakeholder) {
          return requirement_stakeholder
        } else {
          return null
        }
      }
    }
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
        throw new Error('Unrecognized requirement source type')
      }
    }
  },
  Mutation: {
    createRequirement: (obj, { input }, ctx, info) => {
      return dataBaseService.createNode({
        tableName: TABLE_NAME,
        data: input,
        returning: ctx.requestedFields(info),
      })
    },
    updateRequirement: (obj, { id, input }, ctx, info) => {
      return dataBaseService.updateNode({
        tableName: TABLE_NAME,
        data: input,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteRequirement: (obj, { id }, ctx, info) => {
      return dataBaseService.deleteNode({
        tableName: TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info)
      })
    },
  }
}
