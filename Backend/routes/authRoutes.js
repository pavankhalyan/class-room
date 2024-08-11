const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controllers/userController');

// Signup route for user registration
router.post('/signup', createUser);

// Login route for user authentication
router.post('/login', login);

module.exports = router;
