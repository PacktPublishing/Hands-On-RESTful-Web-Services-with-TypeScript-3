import * as passport from 'passport'
import { Strategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'

export class PassportConfiguration {
  constructor() {
    // This verifies that the token sent by the user is valid
    passport.use(
      new Strategy(
        {
          // secret we used to sign our JWT
          secretOrKey: 'top_secret',
          // we expect the user to send the token as a query paramater with the name 'secret_token'
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        async (token, done) => {
          try {
            // Pass the user details to the next middleware
            return done(null, token.user)
          } catch (error) {
            done(error)
          }
        }
      )
    )
  }
}
