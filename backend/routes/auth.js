const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, companyName } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, role: 'admin' });
    await user.save();

    // Create a new company with the user as the admin
    const company = new Company({ name: companyName, adminId: user._id, employees: [user._id] });
    await company.save();

    // Update the user with the company ID
    user.companyId = company._id;
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response
    res.status(201).json({ token, role: user.role, userId: user._id, companyId: company._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;