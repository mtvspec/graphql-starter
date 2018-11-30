import { dataBaseService } from '../../services/database.service'

// TODO: refactor
const REQUIREMENT_TABLE_NAME: string = 'requirement'
const REQUIREMENT_SOURCE_TABLE_NAME: string = 'requirement_source'
const REQUIREMENT_STAKEHOLDER_TABLE_NAME: string = 'requirement_stakeholder'
const SOURCE_TABLE_NAME: string = 'source'
const STAKEHOLDER_TABLE_NAME: string = 'stakeholder'

export const resolvers = {
  Query: {
    allRequirements: () => ({}),
    requirement: async (obj, { id }, ctx, info) => {
      return await dataBaseService.getNode({
        tableName: REQUIREMENT_TABLE_NAME,
        fields: ['id', 'title', 'description'], // TODO: refactor this
        target: { id },
      })
    },
  },
  Requirement: {
    requirementSource: async ({ id }, args, ctx, info) => {
      const source = await dataBaseService.getNode({
        tableName: REQUIREMENT_SOURCE_TABLE_NAME,
        fields: ['id', 'requirement', 'source'], // TODO: refactor this
        target: { requirement: id }
      })
      if (source) {
        return source
      } else {
        const stakeholder = await dataBaseService.getNode({
          tableName: REQUIREMENT_STAKEHOLDER_TABLE_NAME,
          fields: ['id', 'requirement', 'stakeholder'], // TODO: refactor this
          target: { requirement: id }
        })
        if (stakeholder) {
          return stakeholder
        }
      }
    },
  },
  RequirementSource: {
    source: async ({ source, stakeholder }, args, ctx, info) => {
      if (source) {
        const requirement_source = await dataBaseService.getNode({
          tableName: SOURCE_TABLE_NAME,
          fields: ['id', 'source'],  // TODO: refactor this
          target: { id: source }
        })
        if (requirement_source) {
          return requirement_source
        }
      } else if (stakeholder) {
        const requirement_stakeholder = await dataBaseService.getNode({
          tableName: STAKEHOLDER_TABLE_NAME,
          fields: ['id', 'person'],  // TODO: refactor this
          target: { id: stakeholder }
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
        tableName: REQUIREMENT_TABLE_NAME,
        countFieldName: 'id',
        as: 'totalCount'
      })
    },
    requirements: (obj, { orderBy = 'id' }, ctx, info) => {
      return dataBaseService.getNodes({
        tableName: REQUIREMENT_TABLE_NAME,
        fields: ['id', 'title', 'description'], // TODO: refactor
        orderBy,
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
    createRequirement: (obj, { data }, ctx, info) => {
      return dataBaseService.createNode({
        tableName: REQUIREMENT_TABLE_NAME,
        data,
        returning: ctx.requestedFields(info),
      })
    },
    updateRequirement: (obj, { id, data }, ctx, info) => {
      return dataBaseService.updateNode({
        tableName: REQUIREMENT_TABLE_NAME,
        data,
        target: { id },
        returning: ctx.requestedFields(info),
      })
    },
    deleteRequirement: (obj, { id }, ctx, info) => {
      return dataBaseService.deleteNode({
        tableName: REQUIREMENT_TABLE_NAME,
        target: { id },
        returning: ctx.requestedFields(info)
      })
    },
  }
}
