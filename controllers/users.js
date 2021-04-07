const User = require('../servise/schemas/users');
const jimp = require('jimp');
const fs = require('fs').promises
const path = require('path');
const { addUser, findUserByEmail, findUserById, findUserAndUpdate } = require('../servise/users');
const upload = require('../config/multer')
require('dotenv').config();
const { IMG } = process.env;
const PUBLIC_DIR = path.join(process.cwd(), IMG);
// const downloadGravatar = require('../config/gravatar')

const add = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  try {
    const user = await findUserByEmail({ userEmail });
    if (user) {
      return res.status(409).json({ status: 'error', code: 409, message: 'Email in use' });
    }
    const newUser = new User({ userName, userEmail });
    newUser.setPassword(password);
    const result = await addUser(newUser);
  //  await downloadGravatar(result.avatarUrl, result._id)

    res.json({
      status: 'success',
      code: 201, 
      data: {
        userName: result.userName,
        userEmail: result.userEmail,
        avatarUrl: result.avatarUrl
      }
    });
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  const { _id } = req.user[0];
  const user = await findUserById(_id);
  if (!user) {
    res.status(401).json({
      status: 'faile',
      code: 401,
      message: 'Not authorized'
    });
  }
  res.json({
    status: 'success',
    code: 204,
    data: {
      userEmail: user.userEmail,
      subscription: user.subscription,
      avatarUrl: user.avatarUrl
    }
  });
};

const updateUser = async (req, res, next) => {
  const { _id } = req.user[0];
  try {
    const user = await findUserAndUpdate(_id, req.body);
    if (user) {
      res.json({
        status: 'success',
        code: 201,
        data: {
          userName: user.userName,
          userEmail: user.userEmail,
          subscription: user.subscription
        }
      });
    }
    if (!user) {
      res.status(401).json({
        status: 'faile',
        code: 401,
        message: 'Not authorized'
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateAvatar = async (req, res, next) => {
const { _id, avatarUrl} = req.user[0];
try {
  const user = await findUserAndUpdate(_id, avatarUrl);
    if (!user) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized'
      });
    } else {
    if(req.file) {
    const img = await jimp.read(req.file.path);
    await img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE ).writeAsync(req.file.path);
    await fs.rename(req.file.path,  path.join(PUBLIC_DIR, req.file.originalname));
   res.json({status: "success", code: 200, data: user.avatarUrl});
}}
} catch (e) {
  next(e)
}
};

module.exports = { add, current, updateUser, updateAvatar };
