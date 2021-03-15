const express = require("express");
const router = express.Router();
// const contacts = require("../../model/contacts.json");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const list = await listContacts();
    res.json({ status: "success", code: 200, data: list });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params);
    if (contact) {
      res.json({ status: "success", code: 200, data: contact });
    } else {
      res.json({ status: "error", code: 404, message: "Not Found" });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    if (!name || !email || !phone) {
      res.json({
        status: "error",
        code: 400,
        message: `Missing Required Name Field`,
      });
    } else {
      const contact = await addContact(req.body);
      res.json({ status: "success", code: 201, data: contact });
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removed = await removeContact(req.params);
    if (removed) {
      res.json({ status: "success", code: 200, message: "Contact Deleted" });
    } else {
      res.json({ status: "error", code: 404, message: "Not Found" });
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    if (!req.body) {
      res.json({
        status: "error",
        code: 400,
        message: `Missing Required Name Field`,
      });
    } else {
      const corrContact = await updateContact(req.params, req.body);
      if (corrContact) {
        res.json({ status: "success", code: 200, data: corrContact });
      } else {
        res.json({ status: "error", code: 404, message: "Not Found" });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
