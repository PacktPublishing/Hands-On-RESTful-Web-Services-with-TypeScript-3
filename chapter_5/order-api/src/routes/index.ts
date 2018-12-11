import { Request, Response } from 'express'

export class Index {
  public routes(app): void {
    app.route('/index').get((req: Request, res: Response) => {
      res.status(200).send({ status: 'success' })
    })
  }
}
