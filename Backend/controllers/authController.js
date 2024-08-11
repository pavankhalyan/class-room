const { UserModel } = require('../models/userModel');  // Import the UserModel

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    // Find the user by email using Mongoose
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password
    // Assuming passwords are not hashed, directly compare them
    // If passwords are hashed, you should use bcrypt to compare them
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return the user's role if authentication is successful
    res.json({ role: user.role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login', error });
  }
};

module.exports = {
  login,
};
