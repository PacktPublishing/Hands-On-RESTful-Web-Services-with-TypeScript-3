import * as passport from 'passport'
import * as userController from '../controllers/user'
import { PassportConfiguration } from '../utility/passportConfiguration'

export class UserRoute extends PassportConfiguration {
  public routes(app): void {
    app
      .route('/users')
      .post(
        passport.authenticate('jwt', { session: false }),
        userController.addUser
      )
    app.route('/users/login').get(userController.login)
    app
      .route('/users/:username')
      .patch(
        passport.authenticate('jwt', { session: false }),
        userController.updateUser
      )
    app
      .route('/users/:username')
      .delete(
        passport.authenticate('jwt', { session: false }),
        userController.removeUser
      )
    app
      .route('/users/:username')
      .get(
        passport.authenticate('jwt', { session: false }),
        userController.getUser
      )
  }
}
