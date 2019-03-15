import { Response } from 'express'
import * as js2xmlparser from 'js2xmlparser'
import { ApplicationType } from '../models/applicationType'

export let formatOutput = (
  res: Response,
  data: any,
  statusCode: number,
  rootElement?: string
) => {
  return res.format({
    json: () => {
      res.type(ApplicationType.JSON)
      res.status(statusCode).send(data)
    },
    xml: () => {
      res.type(ApplicationType.XML)
      res.status(200).send(js2xmlparser.parse(rootElement, data))
    },
    default: () => {
      res.status(406).send()
    },
  })
}
