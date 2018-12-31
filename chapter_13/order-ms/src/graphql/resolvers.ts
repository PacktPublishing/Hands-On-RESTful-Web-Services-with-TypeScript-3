import { OrderModel } from '../schemas/order'

export class OrderGraphQLResolvers {
  public getResolvers(): Object {
    return {
      Query: {
        allOrders: async () => await OrderModel.find({}),
        listByOrderId: async (root, args, context) => {
          return await OrderModel.findById({ _id: args.id })
        },
      },
    }
  }
}
