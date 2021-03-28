const express = require('express');
const router = express.Router();
const {add} = require("../../controllers/users")
const {login, logInUser} = require('../../controllers/auth')

router.post("/register", add);
router.post("/login", logInUser);

module.exports = router;