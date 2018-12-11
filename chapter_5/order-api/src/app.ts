import * as bodyParser from 'body-parser' // used to parse the form data that you pass in the request
import * as express from 'express'
import { Index } from '../src/routes/index'

class App {
  public app: express.Application
  public indexRoutes: Index = new Index()

  constructor() {
    this.app = express() // run the express instance and store in app
    this.app.use(bodyParser.json())
    this.indexRoutes.routes(this.app)
  }
}

export default new App().app
