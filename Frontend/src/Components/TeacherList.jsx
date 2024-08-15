import  { useEffect, useState } from 'react';
import Table from './Table';

function TeacherList() {
  const [teachers] = useState([]);

  useEffect(() => {
    // Fetch teacher data from backend
    // Example: setTeachers(response.data);
  }, []);

  return (
    <div>
      <h2>Teacher List</h2>
      <Table data={teachers} />
    </div>
  );
}

export default TeacherList;
