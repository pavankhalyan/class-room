import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch student data by ID from backend
    // Example: setStudent(response.data);
  }, [id]);

  const handleSubmit = (updatedData) => {
    // Submit updated student data to backend
  };

  return (
    <div>
      <h2>Student Detail</h2>
      {student && <Form data={student} onSubmit={handleSubmit} />}
    </div>
  );
}

export default StudentDetail;
