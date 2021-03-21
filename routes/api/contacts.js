const express = require("express");
const router = express.Router();
const Contact = require("../../servise/schemas/tasks");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../servise/index");

router.get("/", listContacts);
router.get("/:id", getContactById);
router.post("/", addContact);
router.delete("/:id", removeContact);
router.patch("/:id", updateContact);

module.exports = router;
