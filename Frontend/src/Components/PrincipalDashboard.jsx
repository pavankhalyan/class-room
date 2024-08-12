import { Link } from 'react-router-dom';
import '../Styles/PrincipalDashboard.css';

const PrincipalDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Principal Dashboard</h2>
      <p>Welcome to the principal dashboard. Here you can manage teachers, students, and classrooms.</p>
      
      <div className="dashboard-links">
        <Link to="/create-classroom" className="dashboard-button">
          Create Classroom
        </Link>
        <Link to="/assign-teachers" className="dashboard-button">
          Assign Teachers to Classrooms
        </Link>
        <Link to="/assign-students" className="dashboard-button">
          Assign Students to Teachers
        </Link>
      </div>
    </div>
  );
}

export default PrincipalDashboard;
