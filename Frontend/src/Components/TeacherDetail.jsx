import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

function TeacherDetail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    // Fetch teacher data by ID from backend
    // Example: setTeacher(response.data);
  }, [id]);

  const handleSubmit = (updatedData) => {
    // Submit updated teacher data to backend
  };

  return (
    <div>
      <h2>Teacher Detail</h2>
      {teacher && <Form data={teacher} onSubmit={handleSubmit} />}
    </div>
  );
}

export default TeacherDetail;
