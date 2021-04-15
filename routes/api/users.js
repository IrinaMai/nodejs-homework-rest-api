const express = require('express');
const router = express.Router();
const { current, updateUser, updateAvatar, verify, resendToken} = require('../../controllers/users');
const isLogged = require('../../config/passport');
const upload = require('../../config/multer')

router.get('/current', isLogged, current);
router.patch('/', isLogged, updateUser);
router.patch('/avatar', isLogged, upload.single('avatar'), updateAvatar);
router.get('/verify/:verificationToken', verify);
router.post('/verify/', resendToken)

module.exports = router;
