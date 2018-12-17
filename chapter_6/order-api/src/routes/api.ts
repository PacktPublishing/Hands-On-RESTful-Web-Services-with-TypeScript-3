import * as apiController from '../controller/api'

export class APIRoute {
  public routes(app): void {
    app.route('/api').get(apiController.getApi)
  }
}
