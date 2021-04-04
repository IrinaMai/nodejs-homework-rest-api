const express = require('express')
const router = express.Router()
const { current, updateUser } = require('../../controllers/users')
const isLogged = require('../../config/passport')

router.get('/current', isLogged, current)
router.patch('/', isLogged, updateUser)

module.exports = router
