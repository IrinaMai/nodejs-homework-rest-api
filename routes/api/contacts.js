const express = require("express");
const router = express.Router();
//const Contact = require("../../servise/schemas/contacts");
const {get, getById, add, remove, update} = require('../../controllers/contacts')


router.get("/", get);
router.get("/:id", getById);
router.post("/", add);
router.delete("/:id", remove);
router.patch("/:id", update);

module.exports = router;
