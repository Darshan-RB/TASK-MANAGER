const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const User = require('./models/User');  // Adjust this path as necessary
const Task = require('./models/Task');  // Adjust this path as necessary

// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/task-manager')
//   .then(() => console.log('Connected to MongoDB: task-manager'))
//   .catch(err => console.log('MongoDB connection error:', err));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas: task-manager'))
.catch(err => console.log('MongoDB connection error:', err));


// Middleware
app.use(cors());
app.use(express.json());

// POST /login (Login User)
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

// POST /users (Create New User)
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  try {
    // Create new user
    const newUser = new User({ name, email, password });

    // Save the user to the database
    await newUser.save();

    // Send the newly created user as a response
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /tasks (Create a New Task)
app.post('/tasks', async (req, res) => {
  const { title, description, assignedTo, dueDate, priority, createdBy } = req.body; // ✅ Add priority and createdBy

  const user = await User.findById(assignedTo);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      priority,    // ✅ Now defined
      createdBy,   // ✅ Make sure it's passed too
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /tasks/:taskId → Delete a task by ID
app.delete('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// GET /tasks/:userId (Fetch tasks assigned to a user)
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

// Example route
app.get('/tasks/createdby/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ createdBy: userId }).populate('assignedTo', 'name');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Backend (Node.js/Express)
app.patch('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
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

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

