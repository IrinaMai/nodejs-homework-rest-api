const User = require('../servise/schemas/users');
const {cloudinary} = require("../config/cloudinary");
// const jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');
const { addUser, findUserByEmail, findUserById, findUserAndUpdate, verifyUser, updateUserInfo, resendUserToken } = require('../servise/users');
const upload = require('../config/multer');
require('dotenv').config();
const { IMG } = process.env;
const PUBLIC_DIR = path.join(process.cwd(), IMG);
// const myEmail= require('../config/mail')


const add = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  try {
  const user = await findUserByEmail({ userEmail });
    if (user) {
      return res.status(409).json({ status: 'error', code: 409, message: 'Email in use' });
    }
  const newUser = new User({ userName, userEmail});
  newUser.setPassword(password);

   const result = await addUser(newUser);
   res.json({
     status: "Veriffication email send"
   })

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
const pathFile = req.file.path;
  const user = await findUserById(_id);
  if(user) {
    if(user.avatarId) {
      await cloudinary.uploader.destroy(user.avatarId)
    }
   const result = await cloudinary.uploader.upload(pathFile, {
    folder: "avatars", 
    transformation: {
      width: 250, 
    }});
  const userWithAvatar = await 
  findUserAndUpdate(_id, {avatarUrl: result.secure_url, avatarId: result.public_id })  
    res.json({
      status: "success",
      code: 201,
      avatarUrl: userWithAvatar.avatarUrl
    })
    await fs.unlink(pathFile)
  } else  if (!user) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized'
      });
}
}

  //   const img = await jimp.read(req.file.path);
  //   await img.autocrop().cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE ).writeAsync(req.file.path);
  //   await fs.rename(req.file.path,  path.join(PUBLIC_DIR, req.file.originalname));
  //  res.json({status: "success", code: 200, data: user.avatarUrl});



const verify = async (req, res, next) => {
  const {verificationToken} = req.params;
  const {userEmail} = req.body;
  // console.log(userEmail)
  const result = await findUserByEmail({verifyToken: verificationToken});
  if(result) {
  if(result.userEmail === userEmail) {
   await result.updateOne({verify: true, verifyToken: null})
   res.json({
      status: 'success',
      code: 201, 
      data: {
        userName: result.userName,
        userEmail: result.userEmail,
        avatarUrl: result.avatarUrl
      }
    });
  } else { res.status(401).json({
       status: 'error',
      code: 401, 
    message: "Not authorized"
    })}
  } else { res.status(401).json({
       status: 'error',
      code: 401, 
    message: "Not authorized"
    })}

};

const resendToken = async (req, res, next) => {
  const {userEmail} = req.body
  const result = await findUserByEmail({userEmail})
  if(!result) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required field email"
    })
  }
  if(!result.verify){
    const {userName, userEmail, verifyToken} = result
   await resendUserToken(result)
    res.json({
     status: "Veriffication email send"
   })
  }

}

module.exports = { add, current, updateUser, updateAvatar, verify, resendToken };
