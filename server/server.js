const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const User = require('./models/User');  // Adjust this path as necessary

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/task-manager')
  .then(() => console.log('Connected to MongoDB: task-manager'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ assignedTo: userId });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from 'users' collection
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server Error');
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// In your server.js or wherever you're defining routes

const Task = require('./models/Task'); // Import the Task model

// Create a new task
// app.post('/tasks', async (req, res) => {
//   const { title, description, assignedTo } = req.body;

//   try {
//     const newTask = new Task({
//       title,
//       description,
//       assignedTo,
//     });

//     await newTask.save();
//     res.status(201).json(newTask); // Send back the newly created task
//   } catch (error) {
//     console.error('Error creating task:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

app.post('/tasks', async (req, res) => {
  const { title, description, assignedTo } = req.body;

  // Check if the user exists
  const user = await User.findById(assignedTo);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
    });

    await newTask.save();
    res.status(201).json(newTask);  // Send back the newly created task
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/users', async (req, res) => {
  const { name, email,password } = req.body;

  // Check if all fields are provided
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  try {
    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Send the newly created user as a response
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error); // Log detailed error
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});