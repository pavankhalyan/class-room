// models/studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student', enum: ['student'], required: true },
//   classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }, // Reference to the Classroom model
});

module.exports = mongoose.model('Student', studentSchema);
