import { NextFunction, Request, Response } from 'express'
import { formatOutput } from '../utility/userApiUtility'

export let getApi = (req: Request, res: Response, next: NextFunction) => {
  return formatOutput(res, { title: 'User microservice' }, 200)
}
