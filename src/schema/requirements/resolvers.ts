import { db } from './../../connector'

export const resolvers = {
  Query: {
    allRequirements: async (obj, args, ctx, info) => {
      const requirements: [] = await db('requirement')
      if (requirements === undefined) throw new Error('Requirements not fetched')
      if (requirements.length > 0) {
        await requirements.forEach(async (requirement: any) => {
          const source = await db('requirement_source')
            .where({ requirement: requirement['id'] })
            .first()
          if (source) {
            const requirement_source = await db('source')
              .where({ id: source['source'] })
              .first()
            if (requirement_source) requirement['requirementSource'] = {
              id: source['id'],
              source: requirement_source
            }
            console.log(requirement);

            return requirement
          }
          const stakeholder = await db('requirement_stakeholder')
            .where({ requirement: requirement['id'] })
            .first()
          if (stakeholder) {
            const requirement_stakeholder = await db('stakeholder')
              .where({ id: stakeholder['stakeholder'] })
              .first()
            if (requirement_stakeholder) requirement['requirementSource'] = {
              id: stakeholder['id'],
              source: requirement_stakeholder
            }
            console.log(requirement);

            return requirement
          }
        })
      }
      return requirements
    },
    requirement: (obj, args, ctx, info) => {
      return new Requirement({
        id: 1,
        title: 'Requirement'
      })
    }
  },
  // RequirementSource: {
  //   source: () => ({})
  // },
  USource: {
    __resolveType(obj, args, ctx, info) {
      console.log(obj);

      if (obj.person) {
        return 'Stakeholder'
      }
      if (obj.source) {
        return 'Source'
      }
    }
  }
}

class Requirement {
  id: number
  requirementSource: RequirementSource
  title: string
  constructor(data) {
    this.id = Number(data.id)
    this.title = data.title
    this.requirementSource = data.requirementSource
    return this
  }
}

interface RequirementSource {
  id: number
  source: Person | Law
}

interface Person {
  id: number
  firstName: string
}

interface Law {
  id: number
  law: string
}