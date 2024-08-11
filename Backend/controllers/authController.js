// controllers/authController.js

const users = require('../models/userModel');

const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  login,
};
