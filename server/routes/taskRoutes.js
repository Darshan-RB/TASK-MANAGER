// const express = require('express');
// const Task = require('../models/Task');
// const router = express.Router();

// // Create a new task
// router.post('/', async (req, res) => {
//   const { title, assignee, dueDate } = req.body;

//   try {
//     const newTask = new Task({ title, assignee, dueDate });
//     await newTask.save();
//     res.status(201).json(newTask); // Return the created task as response
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating task' });
//   }
// });

// module.exports = router;
