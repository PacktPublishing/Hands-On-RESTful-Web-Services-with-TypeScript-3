import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Index } from '../src/routes/index'

class App {
  public app: express.Application
  public indexRoutes: Index = new Index()

  constructor() {
    this.app = express() 
    this.app.use(bodyParser.json())
    this.indexRoutes.routes(this.app)
  }
}

export default new App().app
