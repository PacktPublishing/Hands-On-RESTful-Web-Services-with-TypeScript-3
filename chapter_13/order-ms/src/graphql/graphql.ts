import { ApolloServer, gql } from 'apollo-server-express'

export class GraphQL {
  public typeDefs: string
  public resolvers: Object
  public server: ApolloServer

  constructor() {
    this.typeDefs = gql`
      type Query {
        hello: String
      }
    `

    this.resolvers = {
      Query: {
        hello: () => 'Hello world!',
      },
    }

    this.server = new ApolloServer({
      typeDefs: this.typeDefs,
      resolvers: this.resolvers,
    })
  }

  public setup(app): void {
    this.server.applyMiddleware({ app: app })
  }
}
