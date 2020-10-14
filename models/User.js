const mongoose = require('mongoose')

const User = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: String,
    default:
      'https://res.cloudinary.com/dnuwke5no/image/upload/v1602615104/default_avatar_dsihy3.png',
  },
  phone: {
    type: String,
    default: '',
  },
})

module.exports = mongoose.model('User', User)
