import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'
import { APIRoute } from '../src/routes/api'
import { OrderRoute } from '../src/routes/order'
import { UserRoute } from '../src/routes/user'

class App {
  public app: express.Application
  public userRoutes: UserRoute = new UserRoute()
  public apiRoutes: APIRoute = new APIRoute()
  public orderRoutes: OrderRoute = new OrderRoute()
  public mongoUrl: string = 'mongodb://localhost/order-api'

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.userRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.orderRoutes.routes(this.app)
    this.mongoSetup()
  }

  private mongoSetup(): void {
    mongoose.connect(
      this.mongoUrl,
      { useNewUrlParser: true }
    )
  }
}

export default new App().app
