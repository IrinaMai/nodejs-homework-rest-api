const fs = require('fs/promises')
const contacts = require('./contacts.json')
const { v4 } = require('uuid')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const list = await fs.readFile(contactsPath)
  const corrList = JSON.parse(list.toString())
  return corrList
}

const getContactById = async ({ contactId }) => {
  const corrList = await listContacts()
  const oneContact = corrList.find((item) => item.id == contactId)
  return oneContact
}

const removeContact = async ({ contactId }) => {
  const corrList = await listContacts()
  const removedList = corrList.filter((item) => item.id != contactId)
  if (removedList.length < corrList.length) {
    fs.writeFile(contactsPath, JSON.stringify(removedList))
    return true
  } else {

  }
}

const addContact = async (body) => {
  const oneContact = {
    id: v4(),
    ...body,
  }
  const corrList = await listContacts()
  corrList.push(oneContact)
  const newList = await fs.writeFile(contactsPath, JSON.stringify(corrList))
  const lastOne = corrList[corrList.length - 1]
  return lastOne
}

const updateContact = async ({ contactId }, body) => {
  const corrList = await listContacts()
  const oneContact = corrList.find((item) => item.id == contactId)
  if (oneContact) {
    const corrContact = { ...oneContact, ...body }
    const newCorrList = corrList.map((item) =>
      item.id == contactId ? corrContact : item
    )
    await fs.writeFile(contactsPath, JSON.stringify(newCorrList))
    return corrContact
  } else {
    return false
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
