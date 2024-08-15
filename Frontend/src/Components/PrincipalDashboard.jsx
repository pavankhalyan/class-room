import { useState, useEffect } from 'react';
import {List, ListItem, ListItemIcon, ListItemText, TextField, Button, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
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
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);
  const [numStudents, setNumStudents] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(''); 
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [students, setStudents] = useState([]);
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
    } catch (error) {
      toast.error(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  // const handleUpdateStudent = async (studentId, updatedData) => {
  //   try {
  //     const response = await axios.put(`http://localhost:5000/api/auth/students/${studentId}`, updatedData);
  //     toast.success(response.data.message);
  //     const { data } = await axios.get('http://localhost:5000/api/auth/students');
  //     setStudents(data);
  //     setEditingStudent(null);
  //   } catch (error) {
  //     toast.error(error.response ? error.response.data.error : 'An error occurred');
  //   }
  // };

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

  // const handleUpdateTeacher = async (teacherId, updatedData) => {
  //   try {
  //     const response = await axios.put(`http://localhost:5000/api/auth/teachers/${teacherId}`, updatedData);
  //     toast.success(response.data.message);
  //     const { data } = await axios.get('http://localhost:5000/api/auth/teachers');
  //     setTeachers(data);
  //     setEditingTeacher(null);
  //   } catch (error) {
  //     toast.error(error.response ? error.response.data.error : 'An error occurred');
  //   }
  // };

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
          <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            <Typography variant="h6" className="text-2xl font-bold mb-6 text-center">Manage Accounts</Typography>
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
                    { students.length > 0 ? (
                      students.map((student) => (
                    <TableRow key={student._id}>
                           <TableCell>{student.email}</TableCell>
                            <TableCell>
                               <IconButton onClick={() => setEditingStudent(student)}>
                            <FaEdit />
                             </IconButton>
                      <IconButton onClick={() => handleDeleteStudent(student._id)}>
                           <FaTrash />
                          </IconButton>
                         </TableCell>
                          </TableRow>
                           ))
                          ) : (
                             <TableRow>
                            <TableCell colSpan={2}>No students found</TableCell>
                        </TableRow>
                        )}
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
                {teachers.length > 0 ? (
                     teachers.map((teacher) => (
                       <TableRow key={teacher._id}>
                         <TableCell>{teacher.email}</TableCell>
                         <TableCell>
                          <IconButton onClick={() => setEditingTeacher(teacher)}>
                           <FaEdit />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteTeacher(teacher._id)}>
                            <FaTrash />
                           </IconButton>
                       </TableCell>
                             </TableRow>
                               ))
                            ) : (
                              <TableRow>
                           <TableCell colSpan={2}>No teachers found</TableCell>
                          </TableRow>
                           )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
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
        <ToastContainer position='top-center' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      </main>
    </div>
  );
};

export default PrincipalDashboard;
