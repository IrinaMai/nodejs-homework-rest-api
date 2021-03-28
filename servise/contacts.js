const Contact = require("./schemas/contacts");


const getAllContacts = (params = {}) => {
    return Contact.find(params)
};
const getContactById = (id) => {
    return Contact.findById(id);
};
const addContact = (body) => {
   return Contact.create(body)
};
const removeContact = (id) => {
    return Contact.findByIdAndDelete(id)
};
const updateContact = (id, body) => {
   return Contact.findByIdAndUpdate(id, body, {new: true});

};

module.exports = {getAllContacts, getContactById, addContact, removeContact, updateContact };
