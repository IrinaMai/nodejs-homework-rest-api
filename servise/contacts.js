const Contact = require('./schemas/contacts')

const getAllContacts = (userId, { limit = 100, offset = 0, sortBy, sotByDesc, filter }) => {
  return Contact.paginate({ owner: userId }, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sotByDesc ? { [`${sotByDesc}`]: -1 } : {})
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'userName userEmail -_id'
    }
  })
}

const getContactById = (userId, id) => {
  return Contact.findById({ owner: userId, _id: id }).populate({
    path: 'owner',
    select: 'userName userEmail -_id'
  })
}

const addContact = (userId, body) => {
  return Contact.create({ ...body, owner: userId })
}

const removeContact = (userId, id) => {
  return Contact.findByIdAndDelete({ owner: userId, _id: id })
}
const updateContact = (userId, id, body) => {
  return Contact.findByIdAndUpdate({ owner: userId, _id: id }, body, { new: true })
}

module.exports = { getAllContacts, getContactById, addContact, removeContact, updateContact }
