import { db } from './../../connector'

class RequirementResolverService {
  public static requirementsTotalCountFieldResolver = async (obj, args, ctx, info) => {
    return await db('requirement')
      .count('id as totalCount')
      .first()
      .then(res => res.totalCount)
      .catch(e => {
        console.error(e)
        throw new Error('Requirements total count fetch failed')
      })
  }
  public static requirementsEdgesResolver = async (obj, args, ctx, info) => {
    return await db('requirement')
      .select('id', 'title', 'description')
      .catch(e => {
        console.error(e)
        throw new Error('Requirements fetch failed')
      })
  }
  public static requirementResolver = async (obj, args, ctx, info) => {
    if (args['id']) {
      const id = args.id
      return await db('requirement')
        .select('id', 'title', 'description')
        .where({ id })
        .first()
        .catch(e => console.error(e))
    } else if (obj && obj['id']) {
      return obj
    } else {
      throw new Error('Requirement ID not provided')
    }
  }
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
  public static createRequirementMutationResolver = async (obj, args, ctx, info) => {
    return await db('requirement')
      .insert(args.input)
      .returning('*')
      .then(res => res[0])
      .catch(e => {
        console.error(e)
        throw new Error('Requirement not created')
      })
  }
}

export const resolvers = {
  Query: {
    allRequirements: () => ({}),
    requirement: RequirementResolverService.requirementResolver,
  },
  Requirement: {
    requirementSource: RequirementResolverService.requirementSourceFieldResolver,
  },
  RequirementSource: {
    source: RequirementResolverService.sourceFieldResolver
  },
  RequirementsConnection: {
    totalCount: RequirementResolverService.requirementsTotalCountFieldResolver,
    edges: RequirementResolverService.requirementsEdgesResolver,
  },
  RequirementEdge: {
    node: RequirementResolverService.requirementResolver,
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
    createRequirement: RequirementResolverService.createRequirementMutationResolver,
  }
}
