const User = require('./schemas/users')

const addUser = (body) => {
  const newUser = new User(body)
  return newUser.save()
}

const findUserByEmail = (params = {}) => {
  return User.findOne(params)
}

const findUserById = (id) => {
  return User.findOne(id)
}

const addTokenToUser = (id, token) => {
  return User.findByIdAndUpdate(id, token, { new: true })
}

module.exports = { addUser, findUserByEmail, addTokenToUser, findUserById }
