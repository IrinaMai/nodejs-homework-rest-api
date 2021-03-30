const express = require('express')
const router = express.Router()
const { current } = require('../../controllers/users')
const isLogged = require('../../config/passport')

router.get('/current', isLogged, current)

module.exports = router
