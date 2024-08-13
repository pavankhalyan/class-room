const bcrypt = require('bcryptjs');
const {users, UserModel} = require('../models/userModel'); 

exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!['student', 'teacher', 'principal'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
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


exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hardcodedUser = users.find(user => user.email === email && user.password === password && user.role === role);
    if (hardcodedUser) {
      return res.status(200).json({ role: hardcodedUser.role });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: `Role mismatched. Expected: ${user.role}, Received: ${role}` });
    }

    res.status(200).json({ role: user.role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};