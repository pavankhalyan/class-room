// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Login route
router.post('/login', authController.login);

module.exports = router;
