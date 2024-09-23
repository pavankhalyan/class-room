const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  days: {
    type: [String],
    required: true,
  },
  numStudents: {
    type: Number,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;
