import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, TextField, Button, Typography, Alert } from '@mui/material';
import { FaUserGraduate, FaChalkboardTeacher, FaUsersCog, FaChalkboard, FaUserTie, FaUserFriends } from 'react-icons/fa';
import '../Styles/PrincipalDashboard.css';
import axios from 'axios'; // Import axios for making HTTP requests

const PrincipalDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/create-student', { email, password });
      setMessage(response.data.message);
      setEmail('');
      setPassword('');
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Account
            </Button>
            {message && <Alert severity="success" style={{ marginTop: 10 }}>{message}</Alert>}
            {error && <Alert severity="error" style={{ marginTop: 10 }}>{error}</Alert>}
          </div>
        );
      case 'create-teacher-account':
        return <div>Create Teacher Account Form</div>;
      case 'manage-accounts':
        return <div>Manage Accounts Content</div>;
      case 'create-classroom':
        return <div>Create Classroom Form</div>;
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
      
      <div className="dashboard">
        <h2>Principal Dashboard</h2>
        <p>Welcome to the principal dashboard. Here you can manage teachers, students, and classrooms.</p>
        <div className="dashboard-content">
          {renderContent()} {/* Render the selected content */}
        </div>
      </div>
    </div>
  );
}

export default PrincipalDashboard;
