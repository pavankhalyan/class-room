import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/principal">Principal Dashboard</Link></li>
          <li><Link to="/teacher">Teacher Dashboard</Link></li>
          <li><Link to="/student">Student Dashboard</Link></li>
          <li><Link to="/teachers">Manage Teachers</Link></li>
          <li><Link to="/students">Manage Students</Link></li>
          <li><Link to="/classrooms">Manage Classrooms</Link></li>
          <li><Link to="/create-classroom">Create Classroom</Link></li>
          <li><Link to="/assign-classroom">Assign Classroom</Link></li>
          <li><Link to="/classroom-students">Classroom Students</Link></li>
          <li><Link to="/create-timetable">Create Timetable</Link></li>
          <li><Link to="/classmates">Classmates</Link></li>
          <li><Link to="/timetable">Timetable</Link></li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar