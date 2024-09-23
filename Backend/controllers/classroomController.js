const Classroom = require('../models/classroomModel');
const User = require('../models/userModel');


exports.createClassroom = async (req, res) => {
  const { name, startTime, endTime, days, numStudents, maxCapacity } = req.body;

  try {
    const newClassroom = new Classroom({
      name,
      startTime,
      endTime,
      days,
      numStudents,
      maxCapacity,
    });

    await newClassroom.save();
    res.status(201).json({ message: 'Classroom created successfully', classroom: newClassroom });
  } catch (err) {
    res.status(500).json({ message: 'Error creating classroom', error: err.message });
  }
}; 

exports.getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.status(200).json(classrooms);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classrooms', error: err.message });
  }
};

exports.assignStudents = async (req, res) => {
  const { classroomId, studentIds } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(400).json({ message: 'Classroom not found' });
    }

    const students = await User.find({ _id: { $in: studentIds }, role: 'student' });

    classroom.students = students.map(student => student._id);

    await classroom.save();
    res.status(200).json({ message: 'Students assigned successfully', classroom });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning students', error: err.message });
  }
};
