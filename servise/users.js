const User = require('./schemas/users');
const {v4} = require('uuid');
 const mailServise = require('../config/mail.js')
const myEmail= require('../config/mail')


const addUser = async (body) => {
   const verifyToken = v4();
   const {userEmail, userName} = body;
  try{
  await myEmail(userName, userEmail, verifyToken)
  const newUser = new User({userEmail, userName, verifyToken});
  return newUser.save();
  }catch(error) {
    console.log(error)
  }
};

const resendUserToken = async (body) => {
   const verifyToken = v4();
   const {userEmail, userName} = body;
  try{
  await myEmail(userName, userEmail, verifyToken)
  const newUser = new User({userEmail, userName, verifyToken});
  }catch(error) {
    console.log(error)
  }
};


const findUserByEmail = (params = {}) => {
  return User.findOne(params);
};

const findUserById = (id) => {
  return User.findOne(id);
};

const findUserAndUpdate = (id, token) => {
  return User.findByIdAndUpdate(id, token, { new: true });
};

const verifyUser =(verification) => {
  // console.log("hi")
return User.findByField({verifyToken: verification});
};

const updateUserInfo = () => {
  return updateOne()
}

module.exports = { addUser, findUserByEmail, findUserAndUpdate, findUserById, verifyUser, updateUserInfo, resendUserToken };
