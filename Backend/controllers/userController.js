const bcrypt = require('bcryptjs');
const {users, UserModel} = require('../models/userModel'); 

exports.createUser = async (req, res) => {
  const { email, password, role, id } = req.body;

  try {
    if (!['student', 'teacher', 'principal'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      role,
      id,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hardcodedUser = users.find(user => user.email === email && user.password === password && user.role === role);
    if (hardcodedUser) {
      return res.status(200).json({ role: hardcodedUser.role });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: `Role mismatched. Expected: ${user.role}, Received: ${role}` });
    }

    res.status(200).json({ role: user.role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
}; 


exports.getStudents = async (req, res) => {
  try {
    const student = await UserModel.findOne({ role: 'student' });
    res.status(200).json({ student });
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ message: 'Error fetching student', error: err.message });
  }
} 

exports.getTeachers = async (req, res) => {
  try {
    const teacher = await UserModel.findOne({ role: 'teacher' });
    res.status(200).json({ teacher });
  } catch (err) {
    console.error('Error fetching teacher:', err);
    res.status(500).json({ message: 'Error fetching teacher', error: err.message });
  }
} 

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;
    const updateData = { email };
    
    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}; 

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

