const express = require('express');
const router = express.Router();
const { login, createUser, getStudents, getTeachers, updateUser, deleteUser } = require('../controllers/userController'); 

router.post('/login', login);
router.post('/signup', createUser);

router.get('/students', getStudents);
router.get('/teachers', getTeachers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);




module.exports = router;
