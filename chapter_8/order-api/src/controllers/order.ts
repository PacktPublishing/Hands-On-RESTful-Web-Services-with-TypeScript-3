import { NextFunction, Request, Response } from 'express'
import * as halson from 'halson'
import * as _ from 'lodash'
import { OrderModel } from '../schemas/order'
import { formatOutput } from '../utility/orderApiUtility'

export let getOrder = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  OrderModel.findById(id, (err, order) => {
    if (!order) {
      return res.status(404).send()
    }
    order = halson(order.toJSON()).addLink('self', `/store/orders/${order.id}`)
    return formatOutput(res, order, 200, 'order')
  })
}

export let getAllOrders = (req: Request, res: Response, next: NextFunction) => {
  const limit = Number(req.query.limit) || 0
  const offset = Number(req.query.offset) || 0

  OrderModel.find({}, null, { skip: offset, limit: limit }).then(orders => {
    if (orders) {
      orders = orders.map(order => {
        return halson(order.toJSON())
          .addLink('self', `/store/orders/${order.id}`)
          .addLink('user', {
            href: `/users/${order.userId}`,
          })
      })
    }
    return formatOutput(res, orders, 200, 'order')
  })
}

export let addOrder = (req: Request, res: Response, next: NextFunction) => {
  const newOrder = new OrderModel(req.body)

  newOrder.save((err, order) => {
    order = halson(order.toJSON())
      .addLink('self', `/store/orders/${order._id}`)
      .addLink('user', {
        href: `/users/${order.userId}`,
      })

    return formatOutput(res, order, 201, 'order')
  })
}

export let removeOrder = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  OrderModel.findById(id, (err, order) => {
    if (!order) {
      return res.status(404).send()
    }
    order.remove(error => {
      res.status(204).send()
    })
  })
}

export let getInventory = (req: Request, res: Response, next: NextFunction) => {
  const status = req.query.status
  OrderModel.find({ status: status }, (err, orders) => {
    orders = _.groupBy(orders, 'userId')
    return formatOutput(res, orders, 200, 'inventory')
  })
}
