import { useEffect, useState } from 'react';
import Table from './Table';

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    // Fetch classroom data from backend
    // Example: setClassrooms(response.data);
  }, []);

  return (
    <div>
      <h2>Classroom List</h2>
      <Table data={classrooms} />
    </div>
  );
}

export default ClassroomList;
