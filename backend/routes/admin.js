const express = require('express');
const User = require('../models/User');
const Company = require('../models/Company');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// Add a new user
router.post('/add-user', isAdmin, async (req, res) => {
  const { name, email, password, role, companyId } = req.body;
  try {
    const user = new User({ name, email, password, role, companyId });
    await user.save();

    // Add the user to the company's employees list
    await Company.findByIdAndUpdate(companyId, { $push: { employees: user._id } });

    res.status(201).json({ message: 'User added successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit user information
router.put('/edit-user/:id', isAdmin, async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete('/delete-user/:id', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new task
router.post('/create-task', isAdmin, async (req, res) => {
  const { title, description, assignedTo, assignedBy } = req.body;
  try {
    const task = new Task({ title, description, assignedTo, assignedBy });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get('/tasks', isAdmin, async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name').populate('assignedBy', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;