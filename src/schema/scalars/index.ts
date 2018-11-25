import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { UserInputError } from 'apollo-server-core'

const PersonFirstNameScalarType = new GraphQLScalarType({
  name: 'PersonFirstName',
  description: 'Person firstName',
  parseValue(value) {
    if (typeof value === 'string' && value.length > 0) {
      return value // value from the client
    } else {
      throw new UserInputError('First name invalid')
    }
  },
  serialize(value) {
    return value; // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value // ast value is always in string format
    }
    return null;
  },
})

export const resolvers = {
  PersonFirstName: PersonFirstNameScalarType
}
