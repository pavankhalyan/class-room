const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const users = require('../models/userModel').users; // Import the hardcoded users
const Student = require('../models/studentModel');  
const Teacher = require('../models/teacherModel');

exports.createStudent = async (req, res) => {
  const { email, password } = req.body;

  try { 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newStudent = new Student({
      email,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student account created successfully', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
};  

exports.createTeacher = async (req, res) => {
  const { email, password } = req.body; 

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newTeacher = new Teacher({
      email,
      password: hashedPassword,
    }); 

    await newTeacher.save();
    res.status(201).json({ message: 'Teacher account created successfully', teacher: newTeacher }); 
    } catch (err) {
    res.status(500).json({ message: 'Error creating teacher', error: err.message });
  }
} 


exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Principal login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hardcodedUser = users.find(user => user.email === email && user.password === password);

    if (hardcodedUser) {
      return res.status(200).json({ role: hardcodedUser.role });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({ role: user.role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
