const express = require('express');
const router = express.Router();
const { createClassroom,getClassrooms,assignStudents } = require('../controllers/classroomController');


router.post('/create-classroom', createClassroom);

router.get('/get-classrooms', getClassrooms )  

router.get('/assign-student', assignStudents)

module.exports = router;
