import { NextFunction, Request, Response } from 'express'
import * as halson from 'halson'
import * as _ from 'lodash'
import { OrderModel } from '../schemas/order'
import { UserModel } from '../schemas/user'
import { OrderAPILogger } from '../utility/logger'
import { formatOutput } from '../utility/orderApiUtility'

export let getOrder = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id

  OrderAPILogger.logger.info(`[GET] [/store/orders/] ${id}`)

  OrderModel.findById(id, (err, order) => {
    if (!order) {
      OrderAPILogger.logger.info(
        `[GET] [/store/orders/:{orderId}] Order ${id} not found.`
      )
      return next(new Error(`Order ${id} not found.`))
    }
    order = halson(order.toJSON()).addLink('self', `/store/orders/${order.id}`)
    return formatOutput(res, order, 200, 'order')
  })
}

export let getAllOrders = (req: Request, res: Response, next: NextFunction) => {
  const limit = Number(req.query.limit) || 0
  const offset = Number(req.query.offset) || 0

  OrderAPILogger.logger.info(`[GET] [/store/orders/]`)

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
  const userId = req.body.userId

  OrderAPILogger.logger.info(`[POST] [/store/orders/] ${userId}`)

  UserModel.findById(userId, (err, user) => {
    if (!user) {
      OrderAPILogger.logger.info(
        `[POST] [/store/orders/] There is no user with the userId ${userId}`
      )
      throw new Error(`There is no user with the userId ${userId}`)
    }

    const newOrder = new OrderModel(req.body)

    OrderAPILogger.logger.info(`[POST] [/store/orders/] ${newOrder}`)

    newOrder.save((error, order) => {
      order = halson(order.toJSON())
        .addLink('self', `/store/orders/${order._id}`)
        .addLink('user', {
          href: `/users/${order.userId}`,
        })

      return formatOutput(res, order, 201, 'order')
    })
  })
}

export let removeOrder = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id

  OrderAPILogger.logger.warn(`[DELETE] [/store/orders/] ${id}`)

  OrderModel.findById(id, (err, order) => {
    if (!order) {
      OrderAPILogger.logger.warn(
        `[DELETE] [/store/orders/:{orderId}] Order id ${id} not found`
      )
      return res.status(404).send()
    }
    order.remove(error => {
      res.status(204).send()
    })
  })
}

export let getInventory = (req: Request, res: Response, next: NextFunction) => {
  const status = req.query.status

  OrderAPILogger.logger.info(`[GET] [/store/inventory/] ${status}`)

  OrderModel.find({ status: status }, (err, orders) => {
    orders = _.groupBy(orders, 'userId')
    return formatOutput(res, orders, 200, 'inventory')
  })
}
