const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const users = require('../models/userModel').users; // Import the hardcoded users

// Create a new user (teacher or student)
exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Principal login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // First, check if the email and password match any of the hardcoded users
    const hardcodedUser = users.find(user => user.email === email && user.password === password);

    if (hardcodedUser) {
      // Return the role if the hardcoded user is authenticated
      return res.status(200).json({ role: hardcodedUser.role });
    }

    // If no hardcoded user is found, proceed to check the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return the user's role if authentication is successful
    res.status(200).json({ role: user.role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};