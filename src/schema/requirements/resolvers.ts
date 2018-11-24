import { db } from './../../connector'

const RequirementsResolver = async (obj, args, ctx, info) => {
  return await db('requirement')
    .select('id', 'title', 'description')
}

const RequirementResolver = async (obj, args, ctx, info) => {
  const id = obj ? obj.id : args.id
  return await db('requirement')
    .select('id', 'title', 'description')
    .where({ id })
    .first()
}

const RequirementSourceFieldResolver = async (obj, args, ctx, info) => {
  const source = await db('requirement_source')
    .where({ requirement: obj['id'] })
    .first()
  if (source) {
    return source
  } else {
    const stakeholder = await db('requirement_stakeholder')
      .where({ requirement: obj['id'] })
      .first()
    if (stakeholder) {
      return stakeholder
    }
  }
}

const SourceFieldResolver = async (obj, args, ctx, info) => {
  if (obj.source) {
    const requirement_source = await db('source')
      .where({ id: obj.source })
      .first()
    if (requirement_source) {
      return requirement_source
    }
  } else if (obj.stakeholder) {
    const requirement_stakeholder = await db('stakeholder')
      .where({ id: obj.stakeholder })
      .first()
    if (requirement_stakeholder) {
      return requirement_stakeholder
    } else {
      return null
    }
  }
}

const StakeholderPersonFieldResolver = async (obj) => {
  return await db('person')
    .where({ id: obj.person })
    .first()
}

const RequirementsTotalCountFieldResolver = async (obj, args, ctx, info) => {
  const { totalCount } = await db('requirement')
    .count('id as totalCount')
    .first()
  return totalCount
}

const CreateRequirementResolver = async (obj, args, ctx, info) => {
  const requirement = await db('requirement')
    .insert(args.input)
    .returning('*')
    .catch(e => console.log(e))
  if (requirement) {
    return requirement[0]
  } else {
    throw new Error('Requirement not created')
  }
}

const RequirementEdgeResolver = async (obj, args, ctx, info) => {
  const requirements = await db('requirement')
    .catch(e => console.error(e))
  return requirements
}

export const resolvers = {
  Query: {
    allRequirements: RequirementsResolver,
    requirement: RequirementResolver,
  },
  Requirement: {
    requirementSource: RequirementSourceFieldResolver
  },
  RequirementSource: {
    source: SourceFieldResolver
  },
  RequirementsConnection: {
    totalCount: RequirementsTotalCountFieldResolver,
    edges: RequirementEdgeResolver,
  },
  RequirementEdge: {
    node: RequirementResolver,
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
  Stakeholder: {
    person: StakeholderPersonFieldResolver
  },
  Mutation: {
    createRequirement: CreateRequirementResolver
  }
}
