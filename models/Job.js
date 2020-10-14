const mongoose = require('mongoose')

const Job = new mongoose.Schema({
  company: {
    type: String,
    trim: true,
    required: true,
  },
  job: {
    type: String,
    trim: true,
    required: true,
  },
  place: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  schedule: {
    type: String,
  },
  education: {
    type: String,
  },
  experience: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 30,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Job', Job)
