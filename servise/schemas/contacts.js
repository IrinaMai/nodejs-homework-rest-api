const {Schema, model, SchemaTypes} = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name should be complited"],
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email should be complited"],
      minlength: 2,
      maxlength: 150,
      match: /[A-z, 0-9, @, /./]/g,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone should be complited"],
      minlength: 5,
      maxlength: 15,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamp: true },
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
