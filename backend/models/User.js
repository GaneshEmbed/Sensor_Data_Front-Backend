// Importing required libraries
const mongoose = require('mongoose');

// Defining a schema for User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Username should be unique
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: false, // Optional field
  },
  companyAddress: {
    type: String,
    required: false, // Optional field
  },
  gstNumber: {
    type: String,
    required: false, // Optional field
  },
});

// Exporting the User model
module.exports = mongoose.model('User', userSchema);