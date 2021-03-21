const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Field 'name' should be complited"],
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Field 'email' should be complited"],
      minlength: 2,
      maxlength: 150,
      match: /[A-z, 0-9, @, .]{3,}/g,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Field 'phone' should be complited"],
      minlength: 5,
      maxlength: 15,
    },
    subscription: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamp: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
