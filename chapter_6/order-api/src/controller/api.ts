import { NextFunction, Request, Response } from 'express'

export let getApi = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({ title: 'Order API' })
}
