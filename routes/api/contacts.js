const express = require('express')
const router = express.Router()
const { get, getById, add, remove, update } = require('../../controllers/contacts')
const isLogged = require('../../config/passport')

router.get('/', isLogged, get)
router.get('/:id', isLogged, getById)
router.post('/', isLogged, add)
router.delete('/:id', isLogged, remove)
router.patch('/:id', isLogged, update)

module.exports = router
