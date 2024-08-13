import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsersCog,
  FaChalkboard,
  FaUserTie,
  FaUserFriends
} from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/PrincipalDashboard.css';

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
  const [numStudents, setNumStudents] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');

  const handleStudentSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/Signup', {
        email: studentEmail,
        password: studentPassword,
        role : 'student'
      });
      toast.success(response.data.message);
      setStudentEmail('');
      setStudentPassword('');
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleTeacherSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/Signup', {
        email: teacherEmail,
        password: teacherPassword,
        role: 'teacher'
      });
      toast.success(response.data.message);
      setTeacherEmail('');
      setTeacherPassword('');
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleClassroomSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/classroom/create-classroom', {
        name: classroomName,
        startTime,
        endTime,
        days,
        numStudents,
        maxCapacity
      });
      toast.success(response.data.message);
      setClassroomName('');
      setStartTime('');
      setEndTime('');
      setDays([]);
      setNumStudents('');
      setMaxCapacity('');
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'create-student-account':
        return (
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-60 h-80">
            <Typography variant="h6" className="text-2xl font-bold mb-6 text-center">Create Student Account</Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="mb-8"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={studentPassword}
              onChange={(e) => setStudentPassword(e.target.value)}
              className="mb-6"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleStudentSubmit}
            >
              Create Account
            </Button>
          </div>
        );
      case 'create-teacher-account':
        return (
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-60 h-80">
            <Typography variant="h6" className="text-2xl font-bold mb-6 text-center">Create Teacher Account</Typography>
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
          </div>
        );
      case 'create-classroom':
        return (
          <div className="scrollable-form">
            <Typography variant="h6" className="text-2xl font-bold mb-6 text-center">Create Classroom</Typography>
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
          </div>
        );
      case 'manage-accounts':
        return <div className="form-container">Manage Accounts Content</div>;
      case 'assign-teachers':
        return <div className="form-container">Assign Teachers to Classrooms Form</div>;
      case 'assign-students':
        return <div className="form-container">Assign Students to Teachers Form</div>;
      default:
        return <p>Select an option from the sidebar to get started.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Principal Dashboard</h3>
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
      <main className="content">
        {renderContent()}
        <ToastContainer position='top-center' className="pl-14" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      </main>
    </div>
  );
};

export default PrincipalDashboard;
