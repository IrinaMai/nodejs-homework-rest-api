const { Schema, model } = require('mongoose')
const bCrypt = require('bcryptjs')
const gravatar = require('gravatar')

const userSchema = new Schema({
  userName: {
    type: String,
    require: [true, 'Name should be complite'],
    minlength: 2,
    maxlength: 50
  },
  userEmail: {
    type: String,
    require: [true, 'Email should be complite'],
    unique: true,
    minlength: 2,
    maxlength: 50,
    validate (value) {
      const check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return check.test(value)
    }
  },
  password: {
    type: String,
    require: [true, 'Password should be complite']
  },
  subscription: {
    type: String,
    enum: ['Free', 'Pro', 'Premium'],
    default: 'Free'
  },
  token: {
    type: String,
    default: null
  },
  avatarUrl: {
    type: String,
    default () {
      return gravatar.url(this.userEmail, { s: '250', protocol: 'https' }, true)
    }
  },
  avatarId: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
})

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
}
userSchema.methods.getPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

const User = model('user', userSchema)
module.exports = User
