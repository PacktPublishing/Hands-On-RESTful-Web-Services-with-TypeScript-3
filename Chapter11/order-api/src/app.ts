import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as expressWinston from 'express-winston'
import * as mongoose from 'mongoose'
import * as winston from 'winston'
import { APIRoute } from './routes/api'
import { OrderRoute } from './routes/order'
import { UserRoute } from './routes/user'
import * as errorHandler from './utility/errorHandler'

class App {
  public app: express.Application
  public userRoutes: UserRoute = new UserRoute()
  public apiRoutes: APIRoute = new APIRoute()
  public orderRoutes: OrderRoute = new OrderRoute()
  public mongoUrl: string
  public mongoUser: string
  public mongoPass: string

  constructor() {
    const path = `${__dirname}/../.env.${process.env.NODE_ENV}`

    dotenv.config({ path: path })
    this.mongoUrl = `mongodb://${process.env.MONGODB_URL_PORT}/${
      process.env.MONGODB_DATABASE
    }`
    this.mongoUser = `${process.env.MONGODB_USER}`
    this.mongoPass = `${process.env.MONGODB_PASS}`

    this.app = express()
    this.app.use(bodyParser.json())
    this.userRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.orderRoutes.routes(this.app)
    this.mongoSetup()
    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
      })
    )
    this.app.use(errorHandler.logging)
    this.app.use(errorHandler.clientErrorHandler)
    this.app.use(errorHandler.errorHandler)
  }

  private mongoSetup(): void {
    let options

    if (process.env.NODE_ENV !== 'prod') {
      options = {
        useNewUrlParser: true,
      }
    } else {
      options = {
        user: this.mongoUser,
        pass: this.mongoPass,
        useNewUrlParser: true,
      }
    }
    mongoose.connect(
      this.mongoUrl,
      options
    )
  }
}

export default new App().app
