const express = require('express');
const router = express.Router();
const { login, createUser, createStudent,createTeacher } = require('../controllers/userController');


router.post('/login', login);
router.post('/signup', createUser);

try{
router.post('/create-student',  createStudent);
}catch(err){
    res.status(400)
    console.log(err)
} 

try{
router.post('/create-teacher',  createTeacher);
}catch(err){
    res.status(400)
    console.log(err)
}


module.exports = router;
