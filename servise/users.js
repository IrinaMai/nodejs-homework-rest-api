const User = require('./schemas/users');

const addUser = (body) => {
    const newUser = new User(body);
    return newUser.save()
}

const findUserByEmail = (params = {}) => {
    return User.findOne(params)
}

const addTokenToUser = (id, {token}) => {
    return User.findByIdAndUpdate(id, {token})
}



module.exports = {addUser, findUserByEmail, addTokenToUser}