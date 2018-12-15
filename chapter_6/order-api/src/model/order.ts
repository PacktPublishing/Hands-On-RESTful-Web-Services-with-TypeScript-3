'use strict'

import './orderStatus'

export interface Order {
  id: Number
  userId: Number
  quantity: Number
  shipDate: Date
  status: String
  orderStatus: OrderStatus
  complete: Boolean
}
