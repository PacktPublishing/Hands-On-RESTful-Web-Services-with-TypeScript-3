import { gql } from 'apollo-server-express'

export class OrderGraphQLTypes {
  public getTypes(): string {
    return gql`
      type Order {
        id: ID!
        userId: Int!
        quantity: Int!
        status: String!
        complete: Boolean!
      }
      type Query {
        allOrders: [Order]!
        listByOrderId(id: ID): Order!
      }
    `
  }
}
