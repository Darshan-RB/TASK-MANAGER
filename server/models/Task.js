// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium', // optional default
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User who created the task
    required: true
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
