import * as apiController from '../controllers/api'

export class APIRoute {
  public routes(app): void {
    app.route('/api').get(apiController.getApi)
  }
}
