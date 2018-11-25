import { db } from "../../connector"

class ProjectResolverService {
  public static async ProjectsResolver(obj, args, ctx, info) {
    return await db('project')
      .select('id', 'customer', 'title', 'description')
      .orderBy('id')
      .catch(e => {
        console.error(e)
        throw new Error('Projects fetch failed')
      })
  }
  public static async ProjectResolver(obj, args, ctx, info) {
    return await db('project')
      .select('id', 'customer', 'title', 'description')
      .where({ id: args['id'] })
      .first()
      .catch(e => {
        console.error(e)
        throw new Error('Project fetch failed')
      })
  }
  public static projectTypeCustomerFieldResolver = async (obj, args, ctx, info) => {
    return await db('customer')
      .select('id', 'name', 'description')
      .where({ id: obj.customer })
      .first()
      .catch(e => {
        console.error(e)
        throw new Error('Customer fetch failed')
      })
  }
  public static async createProjectMutationResolver(obj, args, ctx, info) {
    return await db('project')
      .insert(args.input)
      .returning('*')
      .then(res => res[0])
      .catch(e => {
        console.error(e)
        throw new Error('Project not created')
      })
  }
  public static async updateProjectMutationResolver(obj, args, ctx, info) {
    return await db('project')
      .update(args.input)
      .where({ id: args.id })
      .returning('*')
      .then(res => res[0])
      .catch(e => {
        console.error(e)
        throw new Error('Project not updated')
      })
  }
  public static async deleteProjectMutationResolver(obj, args, ctx, info) {
    return await db('project')
      .delete()
      .where({ id: args.id })
      .returning('*')
      .then(res => res[0])
      .catch(e => {
        console.error(e)
        throw new Error('Project not deleted')
      })
  }
}

export const resolvers = {
  Query: {
    allProjects: ProjectResolverService.ProjectsResolver,
    project: ProjectResolverService.ProjectResolver,
  },
  Project: {
    customer: ProjectResolverService.projectTypeCustomerFieldResolver,
  },
  Mutation: {
    createProject: ProjectResolverService.createProjectMutationResolver,
    updateProject: ProjectResolverService.updateProjectMutationResolver,
    deleteProject: ProjectResolverService.deleteProjectMutationResolver,
  }
}