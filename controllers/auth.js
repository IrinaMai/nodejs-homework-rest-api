const passport = require('passport');
const User = require('../servise/schemas/users');
const jwt = require("jsonwebtoken")
const {findUserByEmail, addTokenToUser} = require('../servise/users')
const dotenv = require('dotenv')
dotenv.config();
const {SECRET_KEY} = process.env;


// const login = (req, res, next)=> {
//     passport.authenticate("jwt", {session: false}, (err, user)=> {
//         if(!user || err){
//             return  res.status(401).json({
//                 status: "error",
//                 code: 401,
//                 message: "Not enough status"
//             });
//         }
//         req.user = user;
//         next();
//     })
// };
// console.log(User.getPassword)

const logInUser = async (req, res, next) => {
const {userEmail, password} = req.body;
const user = await findUserByEmail({userEmail});
const  newUser = new User(user)

if(!user || !newUser.getPassword(password) ) {
    return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong'
    })
}

const payload = {id: user.id};
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"})

const result = await addTokenToUser(user.id, {token})

res.json({
    status: 'success',
    code: 200,
    data: {
        userEmail: result.userEmail,
        subscription: result.subscription
    }
})

}



module.exports = { logInUser}