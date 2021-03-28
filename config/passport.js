const passport = require('passport');
const passportJWT = require('passport-jwt');
const dotenv = require('dotenv')
dotenv.config();
const {SECRET_KEY} = process.env;
const User = require('../servise/schemas/users')
const {ExtractJwt, Strategy} = passportJWT;


const jwtOptions = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}


passport.use(
    new Strategy(jwtOptions, async (payload, done) => {
        const user = await User.find({_id: payload.id});
        if(user){
            done(null, user)
        }
    })
)