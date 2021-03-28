// const Contact = require(".");


// const listContacts = async (req, res, next) => {
//   try {
//     const list = await Contact.find();
//     res.json({ status: "success", code: 200, data: list });
//   } catch (e) {
//     next(e);
//   }
// };

// const getContactById = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const contact = await Contact.findById(id);
//     if (contact) {
//       res.json({ status: "success", code: 200, data: contact });
//     } else {
//       res.json({ status: "error", code: 404, message: "Not Found" });
//     }
//   } catch (e) {
//     next(e);
//   }
// };

// const addContact = async (req, res, next) => {
//   try {
//     const contact = await Contact.create(req.body);
//     res.json({ status: "success", code: 201, data: contact });
//   } catch (e) {
//     next(e);
//   }
// };

// const removeContact = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const removed = await Contact.findByIdAndDelete(id);
//     if (removed) {
//       res.json({ status: "success", code: 200, message: "Contact Deleted" });
//     } else {
//       res.json({ status: "error", code: 404, message: "Not Found" });
//     }
//   } catch (e) {
//     next(e);
//   }
// };

// const updateContact = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const contact = await Contact.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (contact) {
//       res.json({ status: "success", code: 200, data: contact });
//     } else {
//       res.json({ status: "error", code: 404, message: "Not Found" });
//     }
//   } catch (e) {
//     next(e);
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
