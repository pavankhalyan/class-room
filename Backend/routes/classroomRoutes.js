const express = require('express');
const router = express.Router();
const { createClassroom, assignStudents } = require('../controllers/classroomController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Create a classroom
router.post('/create', authMiddleware, createClassroom);

// Assign students to a classroom
router.post('/assign-students', authMiddleware, assignStudents);

module.exports = router;
