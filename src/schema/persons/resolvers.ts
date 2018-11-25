import { db } from './../../connector'

class PersonResolverService {
  public static personsResolver = async (obj, args, ctx, info) => {
    return await db('person')
      .select('id', 'firstName', 'lastName', 'middleName', 'dob')
      .catch(e => {
        console.error(e)
        throw new Error('Persons fetch error')
      })
  }
  public static personResolver = async (obj, args, ctx, info) => {
    return await db('person')
      .select('id', 'firstName', 'lastName', 'middleName', 'dob')
      .where({ id: args.id })
      .first()
      .catch(e => {
        console.error(e)
        throw new Error('Person fetch failed')
      })
  }
  public static createPersonMutationResolver = async (obj, args, ctx, info) => {
    return await db('person')
      .insert(args.input)
      .returning('*')
      .then(res => res[0])
      .catch(e => {
        console.error(e)
        throw new Error('Person not created')
      })
  }
  public static updatePersonMutationResolver = async (obj, args, ctx, info) => {
    return await db('person')
      .update(args.input)
      .where({ id: args.id })
      .returning('*')
      .then(res => res[0])
      .catch(e => {
        console.error(e)
        throw new Error('Person not updated')
      })
  }
}

export const resolvers = {
  Query: {
    allPersons: PersonResolverService.personsResolver,
    person: PersonResolverService.personResolver,
  },
  Mutation: {
    createPerson: PersonResolverService.createPersonMutationResolver,
    updatePerson: PersonResolverService.updatePersonMutationResolver,
  }
}