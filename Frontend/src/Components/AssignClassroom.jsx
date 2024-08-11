import React, { useState, useEffect } from 'react';

function AssignClassroom() {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');

  useEffect(() => {
    // Fetch teachers and classrooms from backend
  }, []);

  const handleSubmit = () => {
    // Assign the selected classroom to the selected teacher
  };

  return (
    <div>
      <h2>Assign Classroom</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Teacher:
          <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Select Classroom:
          <select value={selectedClassroom} onChange={(e) => setSelectedClassroom(e.target.value)}>
            {classrooms.map((classroom) => (
              <option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Assign Classroom</button>
      </form>
    </div>
  );
}

export default AssignClassroom;
