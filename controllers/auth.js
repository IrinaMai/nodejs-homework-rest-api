const jwt = require('jsonwebtoken')
const { findUserByEmail, findUserAndUpdate } = require('../servise/users')
const dotenv = require('dotenv')
dotenv.config()
const { SECRET_KEY } = process.env

const logInUser = async (req, res, next) => {
  const { userEmail, password } = req.body
  const user = await findUserByEmail({ userEmail })

  if (!user || !user.getPassword(password)) {
    return res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Email or password is wrong'
    })
  };

  try {
    const payload = { _id: user.id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

    const result = await findUserAndUpdate(user.id, { token })
    res.json({
      status: 'success',
      code: 200,
      token: token,
      data: {
        userEmail: result.userEmail,
        subscription: result.subscription
      }
    })
  } catch (e) {
    next(e)
  }
}

const logOutUser = async (req, res, next) => {
  const { _id } = req.user[0]
  const user = await findUserAndUpdate(_id, { token: null })
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
    message: 'No token'
  })
}

module.exports = { logInUser, logOutUser }
