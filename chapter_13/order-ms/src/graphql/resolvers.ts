import { OrderStatus } from '../models/orderStatus'

const orders = [
  {
    id: 1,
    userId: '1',
    quantity: 2,
    status: OrderStatus.Placed,
    complete: false,
  },
  {
    id: 2,
    userId: '2',
    quantity: 1,
    status: OrderStatus.Placed,
    complete: false,
  },
  {
    id: 3,
    userId: '3',
    quantity: 1,
    status: OrderStatus.Approved,
    complete: false,
  },
  {
    id: 4,
    userId: '1',
    quantity: 10,
    status: OrderStatus.Delivered,
    complete: true,
  },
]

export class OrderGraphQLResolvers {
  public getResolvers(): Object {
    return {
      Query: {
        allOrders: () => orders,
        listByOrderId: (root, args, context) => {
          return orders.find(order => order.id === Number(args.id))
        },
      },
    }
  }
}
