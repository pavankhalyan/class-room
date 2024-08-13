require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/classroom', classroomRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
