const mongoose = require('mongoose');

// Hardcoded users for initial testing
const users = [
  { email: 'principal@classroom.com', password: 'Admin', role: 'principal' },
  // Add more users for teachers and students as needed
];

// Mongoose User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['principal', 'teacher', 'student'], required: true },
});

// Export both the hardcoded users and the Mongoose model
module.exports = {
  users,
  UserModel: mongoose.model('User', userSchema),
};
