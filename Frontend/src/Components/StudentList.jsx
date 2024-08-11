import React, { useEffect, useState } from 'react';
import Table from './Table';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from backend
    // Example: setStudents(response.data);
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <Table data={students} />
    </div>
  );
}

export default StudentList;
