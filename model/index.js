const fs = require("fs/promises");
const contacts = require("./contacts.json");
const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  const corrList = JSON.parse(list.toString());
  return corrList;
};

const getContactById = async ({ contactId }) => {
  const list = await fs.readFile(contactsPath);
  const corrList = JSON.parse(list.toString());
  const oneContact = corrList.find((item) => item.id == contactId);
  return oneContact;
};

const removeContact = async ({ contactId }) => {
  const list = await fs.readFile(contactsPath);
  const corrList = JSON.parse(list.toString());
  const removedList = corrList.filter((item) => item.id != contactId);
  if (removedList.length < corrList.length) {
    fs.writeFile(contactsPath, JSON.stringify(removedList));
    return true;
  } else {
    return;
  }
};

const addContact = async (body) => {
  const oneContact = {
    id: v4(),
    ...body,
  };
  const list = await fs.readFile(contactsPath);
  const corrList = JSON.parse(list.toString());
  corrList.push(oneContact);
  const newList = await fs.writeFile(contactsPath, JSON.stringify(corrList));
  const myNewList = await fs.readFile(contactsPath);
  const newCorrList = JSON.parse(myNewList.toString());
  const lastOne = newCorrList[newCorrList.length - 1];
  return lastOne;
};

const updateContact = async ({ contactId }, body) => {
  const list = await fs.readFile(contactsPath);
  const corrList = JSON.parse(list.toString());
  const oneContact = corrList.find((item) => item.id == contactId);
  if (oneContact) {
    const corrContact = { ...oneContact, ...body };
    const newCorrList = corrList.map((item) =>
      item.id == contactId ? corrContact : item
    );
    await fs.writeFile(contactsPath, JSON.stringify(newCorrList));
    return corrContact;
  } else {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
