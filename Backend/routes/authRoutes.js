const express = require('express');
const router = express.Router();
const { login , createUser } = require('../controllers/userController');

// Login route for user authentication
router.post('/login', login);

// Signup route for user registration
router.post('/signup', createUser);

module.exports = router;
