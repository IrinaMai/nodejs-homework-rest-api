const { getAllContacts, getContactById, addContact, removeContact, updateContact } = require('../servise/contacts')
const { isLogged } = require('./auth')

const get = async (req, res, next) => {
  const { query = {} } = req
  try {
    const list = await getAllContacts(query)
    res.json({ status: 'success', code: 200, data: { result: list } })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const contact = await getContactById(id)
    if (contact) {
      res.json({ status: 'success', code: 200, data: contact })
    } else {
      res.status(404).json({ status: 'error', code: 404, message: 'Not Found' })
    }
  } catch (e) {
    next(e)
  }
}

const add = async (req, res, next) => {
  const { body } = req
  try {
    const contact = await addContact(body)
    res.json({ status: 'success', code: 201, data: contact })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params
  try {
    const removed = await removeContact(id)
    if (removed) {
      res.json({ status: 'success', code: 200, message: 'Contact Deleted' })
    } else {
      res.status(404).json({ status: 'error', code: 404, message: 'Not Found' })
    }
  } catch (e) {
    next(e)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { body } = req
  try {
    const contact = await updateContact(id, body)
    if (contact) {
      res.json({ status: 'success', code: 200, data: contact })
    } else {
      res.status(404).json({ status: 'error', code: 404, message: 'Not Found' })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = { get, getById, add, remove, update }
