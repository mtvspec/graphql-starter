import { db } from "../../connector"

class CustomerResolverService {
  public static async fetchCustomers(obj, args, ctx, info) {
    return await db('customer')
      .select('id', 'name', 'description')
      .orderBy('id')
      .catch(e => {
        console.error(e)
        throw new Error('Customers fetch failed')
      })
  }
  public static async fetchCustomer(obj, args, ctx, info) {
    return await db('customer')
      .select('id', 'name', 'description')
      .where({ id: args.id })
      .first()
      .catch(e => {
        console.error(e)
        throw new Error('Customer fetch failed')
      })
  }
  public static async createCustomerMutationResolver() {
    throw new Error('Resolver not implemented')
  }
}

export const resolvers = {
  Query: {
    allCustomers: CustomerResolverService.fetchCustomers,
    customer: CustomerResolverService.fetchCustomer,
  },
  Mutation: {
    createCustomer: CustomerResolverService.createCustomerMutationResolver,
  }
}