import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUsersCog } from 'react-icons/fa';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import '../Styles/PrincipalDashboard.css';

const PrincipalDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(''); // State to track selected sidebar option

  const renderContent = () => {
    switch (selectedOption) {
      case 'create-student-account':
        return <div>Create Student Account Form</div>;
      case 'create-teacher-account':
        return <div>Create Teacher Account Form</div>;
      case 'manage-accounts':
        return <div>Manage Accounts Content</div>;
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
