import { IResolvers } from 'graphql-tools';
import { OrderModel } from '../schemas/order'

export class OrderGraphQLResolvers {
  public getResolvers(): IResolvers {
    return {
      Query: {
        allOrders: async () => await OrderModel.find({}),
        listByOrderId: async (root, args, context) => {
          return await OrderModel.findById({ _id: args.id })
        },
      },
      Mutation: {
        createOrder: async (root, args) => {
          const newOrder = new OrderModel(args)
          return await newOrder.save()
        },
      },
    }
  }
}
