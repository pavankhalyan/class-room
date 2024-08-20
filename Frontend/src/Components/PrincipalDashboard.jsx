import { useState, useEffect } from 'react';
import {List, ListItem, ListItemIcon, ListItemText,Dialog,DialogActions,dialogClasses,DialogTitle, TextField, Button, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { FaUserGraduate,FaChalkboardTeacher,FaUsersCog,FaChalkboard,FaUserTie,FaUserFriends,FaEdit,FaTrash } from 'react-icons/fa';
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
  const [classrooms, setClassrooms] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);
  const [numStudents, setNumStudents] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(''); 
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [students, setStudents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [setEditingStudent] = useState(null);
  const [ setEditingTeacher] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/students')
      .then(response => response.json())
      .then(data => setStudents(data))  
      .catch(error => console.error('Error fetching students:', error));
    
    fetch('http://localhost:5000/api/auth/teachers')
      .then(response => response.json())
      .then(data => setTeachers(data)) 
      .catch(error => console.error('Error fetching teachers:', error));
  }, []);  


  const fetchUsers = async () => {
     const studentsResponse = await fetch.get('http://localhost:5000/api/auth/students'); 
     const teacherResponse  = await fetch.get('http://localhost:5000/api/auth/teachers');
     setStudents(studentsResponse);
     setTeachers(teacherResponse);
  }  

  useEffect( () => {
    fetchClassrooms();
  }, []) 


  const fetchClassrooms = async () => {
    try{ 
      const response = await axios.get('http://localhost:5000/api/classroom/get-classrooms'); 
      setClassrooms(response.data);
    }catch(err){ 
      console.error('error in fetching classrooms', err)
    }
  }

  const handleOpenDialog = (user) => {
    setCurrentUser(user);
    setUpdatedEmail(user.email);
    setOpenDialog(true);
  } 

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
    setUpdatedEmail(''); 
    setUpdatedPassword('');
  }

  const handleUpdateUser = async () => {
    try {
      const updatedData = { email: updatedEmail, password: updatedPassword || undefined };

      const response = await axios.put(`http://localhost:5000/api/auth/users/${currentUser._id}`, updatedData);

      toast.success(response.data.message);
      fetchUsers(); 
      handleCloseDialog(); 
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };


  const handleStudentSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/Signup', {
        id:studentId,
        email: studentEmail,
        password: studentPassword,
        role : 'student', 
      });
      toast.success(response.data.message);
      setStudentEmail('');
      setStudentPassword(''); 
      setStudentId('');
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };


  const handleTeacherSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/Signup', {
        id:teacherId,
        email: teacherEmail,
        password: teacherPassword,
        role: 'teacher',
      });
      toast.success(response.data.message);
      setTeacherEmail('');
      setTeacherPassword(''); 
      setTeacherId('');
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

      fetchClassrooms();
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const renderHomeScreen = () => (
    <div className="classroom-list">
      <Typography variant="h6" className="text-2xl font-bold mb-4">Classrooms</Typography>
      {classrooms.length === 0 ? (
        <Typography variant="body1">No classrooms available</Typography>
      ) : (
        <List>
          {classrooms.map((classroom) => (
            <ListItem key={classroom._id}>
              <ListItemIcon>
                <FaChalkboard />
              </ListItemIcon>
              <ListItemText primary={classroom.name} secondary={`Students: ${classroom.numStudents}, Capacity: ${classroom.maxCapacity}`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );

  const handleUpdateStudent = async (student) => {
    try { 
      const studentId = student._id;
      const response = await axios.put(`http://localhost:5000/api/auth/students/${studentId}`, updatedData);
      toast.success(response.data.message);
      const { data } = await axios.get('http://localhost:5000/api/auth/students');
      setStudents(data);
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/students/${studentId}`);
      toast.success(response.data.message);
      const { data } = await axios.get('http://localhost:5000/api/auth/students');
      setStudents(data);
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleUpdateTeacher = async (teacher) => {
    try { 
      const teacherId = teacher._id;
      const response = await axios.put(`http://localhost:5000/api/auth/teachers/${teacherId}`, updatedData);
      toast.success(response.data.message);
      const { data } = await axios.get('http://localhost:5000/api/auth/teachers');
      setTeachers(data);
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/teachers/${teacherId}`);
      toast.success(response.data.message);
      const { data } = await axios.get('http://localhost:5000/api/auth/teachers');
      setTeachers(data);
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  }; 
  

  const renderContent = () => {
    switch (selectedOption) {
      case 'create-student-account':
        return (
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-60 h-90">
            <Typography variant="h6" className="text-2xl font-bold mb-6 text-center">Create Student Account</Typography> 
            <TextField
              label="ID"
              type="text"
              fullWidth
              margin="normal"
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)}
              className="mb-8"
           />
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
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-60 h-90">
            <Typography variant="h6" className="text-2xl font-bold mb-6 text-center">Create Teacher Account</Typography> 
            <TextField
              label="ID"
              type="text"
              fullWidth
              margin="normal"
              value={teacherId} 
              onChange={(e) => setTeacherId(e.target.value)}
              className="mb-8"
           />
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
        return (
          <div className=" mx-auto p-6 bg-white rounded-lg shadow-md ">
          <Typography variant="h6" className="text-xl font-bold mb-4">Students</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(student)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteStudent(student._id)}>
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" className="text-xl font-bold mt-6 mb-4">Teachers</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher._id}>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(teacher)}>
                        <FaEdit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTeacher(teacher._id)}>
                        <FaTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Edit User</DialogTitle>
            <div style={{ padding: '16px' }}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={updatedPassword}
                onChange={(e) => setUpdatedPassword(e.target.value)}
              />
            </div>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
              <Button onClick={handleUpdateUser} color="primary">Save Changes</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
      case 'assign-teachers':
        return <div className="form-container">Assign Teachers to Classrooms Form</div>;
      case 'assign-students':
        return <div className="form-container">Assign Students to Teachers Form</div>;
      default:
        return renderHomeScreen();
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3 onClick={renderHomeScreen} className='cursor-pointer'>Principal Dashboard</h3>
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
        <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      </main>
    </div>
  );
};

export default PrincipalDashboard;
