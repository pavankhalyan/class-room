import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import PrincipalDashboard from './Components/PrincipalDashboard';
import TeacherDashboard from './Components/TeacherDashboard';
import StudentDashboard from './Components/StudentDashboard';
import CreateClassroom from './Components/CreateClassroom';
import CreateTimeTable from './Components/CreateTimeTable';
import ClassroomTimeTable from './Components/ClassroomTimeTable';
import StudentDetail from './Components/StudentDetail';
import StudentList from './Components/StudentList';
import TeacherDetail from './Components/TeacherDetail';
import TeacherList from './Components/TeacherList';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Login />} />
        {/* <Header />
        <Sidebar /> */}
          <Route path="/principal" element={<PrincipalDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/create-classroom" element={<CreateClassroom />} />
          <Route path="/create-timetable" element={<CreateTimeTable />} />
          <Route path="/classroom-timetable" element={<ClassroomTimeTable />} />
          <Route path="/student-detail" element={<StudentDetail />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/teacher-detail" element={<TeacherDetail />} />
          <Route path="/teacher-list" element={<TeacherList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
