import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, TextField, Button, Typography, Alert, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { FaUserGraduate, FaChalkboardTeacher, FaUsersCog, FaChalkboard, FaUserTie, FaUserFriends } from 'react-icons/fa';
import '../Styles/PrincipalDashboard.css';
import axios from 'axios';

const PrincipalDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [classroomName, setClassroomName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);
  const [numStudents, setNumStudents] = useState(''); // Number of students
  const [maxCapacity, setMaxCapacity] = useState(''); // Maximum capacity
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleStudentSubmit = async () => {
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/create-student', 
        { email: studentEmail, password: studentPassword }, 
      );
  
      setMessage(response.data.message);
      setStudentEmail('');
      setStudentPassword('');
    } catch (error) {
      // Handle error response
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };
  
  const handleTeacherSubmit = async () => {
    try {
      const response = await axios.post('/api/create-teacher', { email: teacherEmail, password: teacherPassword });
      setMessage(response.data.message);
      setTeacherEmail('');
      setTeacherPassword('');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleClassroomSubmit = async () => {
    try {
      const response = await axios.post('/api/create-classroom', {
        name: classroomName,
        startTime,
        endTime,
        days,
        numStudents,       // Include number of students
        maxCapacity        // Include maximum capacity
      });
      setMessage(response.data.message);
      setClassroomName('');
      setStartTime('');
      setEndTime('');
      setDays([]);
      setNumStudents(''); // Reset state
      setMaxCapacity(''); // Reset state
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'create-student-account':
        return (
          <div>
            <Typography variant="h6">Create Student Account</Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleStudentSubmit}>
              Create Account
            </Button>
            {message && <Alert severity="success" style={{ marginTop: 10 }}>{message}</Alert>}
            {error && <Alert severity="error" style={{ marginTop: 10 }}>{error}</Alert>}
          </div>
        );
      case 'create-teacher-account':
        return (
          <div>
            <Typography variant="h6">Create Teacher Account</Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleTeacherSubmit}>
              Create Account
            </Button>
            {message && <Alert severity="success" style={{ marginTop: 10 }}>{message}</Alert>}
            {error && <Alert severity="error" style={{ marginTop: 10 }}>{error}</Alert>}
          </div>
        );
      case 'create-classroom':
        return (
          <div className="scrollable-form">
            <Typography variant="h6">Create Classroom</Typography>
            <TextField
              label="Classroom Name"
              fullWidth
              margin="normal"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
            />
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              margin="normal"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <TextField
              label="End Time"
              type="time"
              fullWidth
              margin="normal"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
            <TextField
              label="Number of Students"
              type="number"
              fullWidth
              margin="normal"
              value={numStudents}
              onChange={(e) => setNumStudents(e.target.value)}
            />
            <TextField
              label="Maximum Capacity"
              type="number"
              fullWidth
              margin="normal"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
            />
            <FormControl component="fieldset" style={{ marginTop: 10 }}>
              <Typography variant="subtitle1">Days of the Week</Typography>
              <FormGroup>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={days.includes(day)}
                        onChange={(e) => {
                          setDays(prevDays =>
                            e.target.checked ? [...prevDays, day] : prevDays.filter(d => d !== day)
                          );
                        }}
                      />
                    }
                    label={day}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <Button variant="contained" color="primary" className="submit-button" onClick={handleClassroomSubmit}>
              Create Classroom
            </Button>
            {message && <Alert severity="success" style={{ marginTop: 10 }}>{message}</Alert>}
            {error && <Alert severity="error" style={{ marginTop: 10 }}>{error}</Alert>}
          </div>
        );
      case 'manage-accounts':
        return <div>Manage Accounts Content</div>;
      case 'assign-teachers':
        return <div>Assign Teachers to Classrooms Form</div>;
      case 'assign-students':
        return <div>Assign Students to Teachers Form</div>;
      default:
        return <p>Select an option from the sidebar to get started.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Admin Options</h3>
        <List>
          <ListItem button onClick={() => setSelectedOption('create-student-account')}>
            <ListItemIcon>
              <FaUserGraduate />
            </ListItemIcon>
            <ListItemText primary="Create Student Account" />
          </ListItem>
          <ListItem button onClick={() => setSelectedOption('create-teacher-account')}>
            <ListItemIcon>
              <FaChalkboardTeacher />
            </ListItemIcon>
            <ListItemText primary="Create Teacher Account" />
          </ListItem>
          <ListItem button onClick={() => setSelectedOption('manage-accounts')}>
            <ListItemIcon>
              <FaUsersCog />
            </ListItemIcon>
            <ListItemText primary="Manage Accounts" />
          </ListItem>
          <ListItem button onClick={() => setSelectedOption('create-classroom')}>
            <ListItemIcon>
              <FaChalkboard />
            </ListItemIcon>
            <ListItemText primary="Create Classroom" />
          </ListItem>
          <ListItem button onClick={() => setSelectedOption('assign-teachers')}>
            <ListItemIcon>
              <FaUserTie />
            </ListItemIcon>
            <ListItemText primary="Assign Teachers to Classrooms" />
          </ListItem>
          <ListItem button onClick={() => setSelectedOption('assign-students')}>
            <ListItemIcon>
              <FaUserFriends />
                       </ListItemIcon>
            <ListItemText primary="Assign Students to Teachers" />
          </ListItem>
        </List>
      </aside>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default PrincipalDashboard;

