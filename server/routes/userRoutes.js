const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this points to your User model

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Assuming you're using MongoDB and Mongoose
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
