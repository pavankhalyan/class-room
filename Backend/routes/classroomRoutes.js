const express = require('express');
const router = express.Router();
const { createClassroom, assignStudents } = require('../controllers/classroomController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/create-classroom', createClassroom);


module.exports = router;
