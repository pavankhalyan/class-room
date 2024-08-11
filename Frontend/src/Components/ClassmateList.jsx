import React, { useEffect, useState } from 'react';
import Table from './Table';

function ClassmateList() {
  const [classmates, setClassmates] = useState([]);

  useEffect(() => {
    // Fetch classmates data from backend
    // Example: setClassmates(response.data);
  }, []);

  return (
    <div>
      <h2>Classmate List</h2>
      <Table data={classmates} />
    </div>
  );
}

export default ClassmateList;
