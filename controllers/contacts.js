const { getAllContacts, getContactById, addContact, removeContact, updateContact } = require('../servise/contacts')

const get = async (req, res, next) => {
  const userId = req.user[0]._id
  try {
    const list = await getAllContacts(userId, req.query)
    res.json({ status: 'success', code: 200, data: { result: list } })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  const userId = req.user[0]._id
  const { id } = req.params
  try {
    const contact = await getContactById(userId, id)
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
  const userId = req.user[0]._id
  try {
    const contact = await addContact(userId, req.body)
    res.json({ status: 'success', code: 201, data: contact })
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  const userId = req.user[0]._id
  const { id } = req.params
  try {
    const removed = await removeContact(userId, id)
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
  const userId = req.user[0]._id
  const { id } = req.params
  try {
    const contact = await updateContact(userId, id, req.body)
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
