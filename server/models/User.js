// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    // required: true,
    unique: true, // Ensure email is unique
  },
  // Add other fields as needed
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);  // 'User' will refer to the 'users' collection in MongoDB

module.exports = User;
