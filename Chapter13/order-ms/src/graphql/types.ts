import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

export class OrderGraphQLTypes {
  public getTypes(): DocumentNode {
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
      type Mutation {
        createOrder(
          userId: Int!
          quantity: Int!
          status: String!
          complete: Boolean!
        ): Order
      }
    `
  }
}
