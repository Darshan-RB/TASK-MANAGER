const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);  // 'User' will refer to the 'users' collection in MongoDB

module.exports = User;
