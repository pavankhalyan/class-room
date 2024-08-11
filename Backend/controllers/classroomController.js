const Classroom = require('../models/classroomModel');
const User = require('../models/userModel');

// Create a new classroom
exports.createClassroom = async (req, res) => {
  const { name, startTime, endTime, days, teacherId } = req.body;

  try {
    const teacher = await User.findById(teacherId);

    if (!teacher || teacher.role !== 'teacher') {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }

    const newClassroom = new Classroom({
      name,
      startTime,
      endTime,
      days,
      teacher: teacher._id,
    });

    await newClassroom.save();
    res.status(201).json({ message: 'Classroom created successfully', classroom: newClassroom });
  } catch (err) {
    res.status(500).json({ message: 'Error creating classroom', error: err.message });
  }
};

// Assign students to a classroom
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
