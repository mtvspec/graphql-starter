import { db } from './../../connector'

class StakeholderResolverService {
  public static stakeholderPersonFieldResolver = async (obj, args, ctx, info) => {
    return await db('person')
      .select('id', 'firstName', 'lastName', 'middleName')
      .where({ id: obj.person })
      .first()
      .catch(e => console.error(e))
  }
  public static stakeholdersResolver = async (obj, args, ctx, info) => {
    return await db('stakeholder')
      .select('id', 'person')
      .catch(e => {
        console.error(e)
        throw new Error('Stakeholders fetch error')
      })
  }
  public static stakeholderResolver = async (obj, args, ctx, info) => {
    if (args['id']) {
      const id = args.id
      return await db('stakeholder')
        .select('id', 'person')
        .where({ id })
        .first()
        .catch(e => {
          console.error(e)
          throw new Error('Stakeholder ID not provided')
        })
    } else if (obj && obj['id']) {
      return obj
    }
  }
  public static createStakeholderMutationResolver = async (obj, args, ctx, info) => {
    return await db('stakeholder')
      .insert(args.input)
      .returning('*')
      .then(res => res[0])
      .catch(e => {
        console.error(e)
        throw new Error('Stakeholder not created')
      })
  }
}

export const resolvers = {
  Query: {
    allStakeholders: StakeholderResolverService.stakeholdersResolver,
    stakeholder: StakeholderResolverService.stakeholderResolver,
  },
  Stakeholder: {
    person: StakeholderResolverService.stakeholderPersonFieldResolver
  },
  Mutation: {
    createStakeholder: StakeholderResolverService.createStakeholderMutationResolver,
  }
}