const express = require('express');
const router = express.Router();
const { login, createUser, createStudent } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', login);
router.post('/signup', createUser);

// Protected route (requires authentication)
try{
router.post('/create-student',  createStudent);
}catch(err){
    res.status(400)
    console.log(err)
}


module.exports = router;
