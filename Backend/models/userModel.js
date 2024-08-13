const mongoose = require('mongoose');

const users = [ 
  { email: 'principal@classroom.com', password: 'Admin', role: 'principal' }
];

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['principal', 'teacher', 'student'], required: true },
}); 

const UserModel = mongoose.model('User', userSchema)


module.exports = {
  users,
  UserModel,
};
