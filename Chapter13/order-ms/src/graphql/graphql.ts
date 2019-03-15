import { ApolloServer } from 'apollo-server-express'
import { OrderGraphQLResolvers } from './resolvers'
import { OrderGraphQLTypes } from './types'

export class GraphQL {
  public typeDefs: string
  public resolvers: Object
  public server: ApolloServer

  constructor() {
    this.typeDefs = new OrderGraphQLTypes().getTypes()
    this.resolvers = new OrderGraphQLResolvers().getResolvers()

    this.server = new ApolloServer({
      typeDefs: this.typeDefs,
      resolvers: this.resolvers,
    })
  }

  public setup(app): void {
    this.server.applyMiddleware({ app: app })
  }
}
