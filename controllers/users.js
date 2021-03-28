const passport = require('passport');
const User = require('../servise/schemas/users');
const {addUser, findUserByEmail} = require('../servise/users');



const add = async (req, res, next) => {
    const {userName, userEmail, password} = req.body;
    try{
        const user = await findUserByEmail({userEmail})
        if(user) {
            return res.status(409).json({status: "error", code: 409, message: "Email in use"})
        }
        const newUser = new User({userName, userEmail})
        newUser.setPassword(password)
        const result = await addUser(newUser);
        res.json({ status: "success", code: 201, 
        data: {
            userName: result.userName,
            userEmail: result.userEmail,
    } })
    }catch (e) {
        next(e)
    }
}

module.exports = {add}