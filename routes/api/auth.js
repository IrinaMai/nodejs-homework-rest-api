const express = require('express')
const router = express.Router()
const { add } = require('../../controllers/users')
const { logInUser, logOutUser } = require('../../controllers/auth')
const isLogged = require('../../config/passport')

router.post('/register', add)
router.post('/login', logInUser)
router.post('/logout', isLogged, logOutUser)

module.exports = router
