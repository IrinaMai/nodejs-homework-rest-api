const User = require('../servise/schemas/users')
const { addUser, findUserByEmail, findUserById, findUserAndUpdate } = require('../servise/users')

const add = async (req, res, next) => {
  const { userName, userEmail, password } = req.body
  try {
    const user = await findUserByEmail({ userEmail })
    if (user) {
      return res.status(409).json({ status: 'error', code: 409, message: 'Email in use' })
    }
    const newUser = new User({ userName, userEmail })
    newUser.setPassword(password)
    const result = await addUser(newUser)
    res.json({
      status: 'success',
      code: 201,
      data: {
        userName: result.userName,
        userEmail: result.userEmail
      }
    })
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  const { _id } = req.user[0]
  const user = await findUserById(_id)
  if (!user) {
    res.status(401).json({
      status: 'faile',
      code: 401,
      message: 'Not authorized'
    })
  }
  res.json({
    status: 'success',
    code: 204,
    data: {
      userEmail: user.userEmail,
      subscription: user.subscription
    }
  })
}

const updateUser = async (req, res, next) => {
  const { _id } = req.user[0]
  try {
    const user = await findUserAndUpdate(_id, req.body)
    if (user) {
      res.json({
        status: 'success',
        code: 201,
        data: {
          userName: user.userName,
          userEmail: user.userEmail,
          subscription: user.subscription
        }
      })
    }
    if (!user) {
      res.status(401).json({
        status: 'faile',
        code: 401,
        message: 'Not authorized'
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = { add, current, updateUser }
