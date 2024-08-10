import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrincipalDashboard from './Components/PrincipalDashboard'
import TeacherDashboard from './Components/TeacherDashboard'
import StudentDashboard from './Components/StudentDashboard' 
import CreateClassroom from './Components/CreateClassroom'
import CreateTimeTable from './Components/CreateTimeTable'
import ClassroomTimeTable  from './Components/ClassroomTimeTable' 
import StudentDetail from './Components/StudentDetail' 
import StudentList from './Components/StudentList' 
import TeacherDetail from './Components/TeacherDetail' 
import TeacherList from './Components/TeacherList' 
import Header from './Components/Header' 
import Form from './Components/Form' 
import Table from './Components/Table' 
import Sidebar from './Components/Sidebar'

function App() {
 
  return (
    <Router> 
      <div className="App"> 
        <Header /> 
        <Sidebar /> 
      <Routes>
      <Route path='/principal' element={<PrincipalDashboard />} /> 
      <Route path='/teacher' element={<TeacherDashboard />} />
      <Route path='/student' element={<StudentDashboard />} />
      <Route path='/create-classroom' element={<CreateClassroom />} /> 
      <Route path='/create-timetable' element={<CreateTimeTable />} />
      <Route path='/classroom-timetable' element={<ClassroomTimeTable />} /> 
      <Route path='/student-detail' element={<StudentDetail />} /> 
      <Route path='/student-list' element={<StudentList />} /> 
      <Route path='/teacher-detail' element={<TeacherDetail />} /> 
      <Route path='/teacher-list' element={<TeacherList />} />
      <Route path='/form' element={<Form />} />
      <Route path='/table' element={<Table />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
