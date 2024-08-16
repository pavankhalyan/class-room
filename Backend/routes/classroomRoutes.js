const express = require('express');
const router = express.Router();
const { createClassroom,getClassrooms } = require('../controllers/classroomController');


router.post('/create-classroom', createClassroom);

router.get('/get-classrooms', getClassrooms )

module.exports = router;
