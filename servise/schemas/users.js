const { Schema, model } = require('mongoose');
const bCrypt = require('bcryptjs');

const userSchema = new Schema ({
    userName: {
        type: String,
        require: [true, "Name should be complite"],
        minlength: 2,
        maxlength: 50
    },
    userEmail: {
        type: String,
        require: [true, "Email should be complite"],
        unique: true,
        minlength: 2,
        maxlength: 50
    },
    password: {
        type: String,
        require: [true, "Password should be complite"],
    },
    subscription: {
        type: String,
        enum: ["Free", "Pro", "Premium"],
        default: "Free"
      },
      token: {
          type: String,
          default: null
      },
});

userSchema.methods.setPassword = function (password) {
   this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6)) 
};
userSchema.methods.getPassword = function (password) {
    return bCrypt.compareSync(password, this.password) 
};


const User = model("user", userSchema)
module.exports = User
