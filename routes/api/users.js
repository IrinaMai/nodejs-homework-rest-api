const express = require('express');
const router = express.Router();
const { current, updateUser, updateAvatar } = require('../../controllers/users');
const isLogged = require('../../config/passport');
const upload = require('../../config/multer')

router.get('/current', isLogged, current);
router.patch('/', isLogged, updateUser);
router.patch('/avatar', isLogged, upload.single('avatar'), updateAvatar);

module.exports = router;
