const { Schema, model, SchemaTypes } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name should be complited'],
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email should be complited'],
      minlength: 2,
      maxlength: 150,
      validate (value) {
        const check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        return check.test(value)
      }
    },
    phone: {
      type: String,
      unique: true,
      required: [true, 'Phone should be complited'],
      minlength: 5,
      maxlength: 15
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  { versionKey: false, timestamp: true }
)

contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema)

module.exports = Contact
