const passport = require('passport')
const passportJWT = require('passport-jwt')
const dotenv = require('dotenv')
dotenv.config()
const { SECRET_KEY } = process.env
const User = require('../servise/schemas/users')
const { ExtractJwt, Strategy } = passportJWT

const jwtOptions = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}


passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    try {
    const user = await User.find({ _id: payload._id })
        if (!user) {
          return done(new Error('User not found'))
        }
        return done(null, user)
      }catch(err) { done(err)}
  }),
)

const isLogged = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = isLogged
