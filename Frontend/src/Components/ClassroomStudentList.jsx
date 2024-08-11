import { useEffect, useState } from 'react';
import Table from './Table';
import axios from 'axios'; // Import Axios

function ClassroomStudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students in the teacher's classroom from the backend
    axios.get('/api/classroom/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Classroom Student List</h2>
      <Table data={students} />
    </div>
  );
}

export default ClassroomStudentList;
