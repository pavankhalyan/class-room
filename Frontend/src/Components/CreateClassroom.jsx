import React, { useState } from 'react';

function CreateClassroom() {
  const [classroom, setClassroom] = useState({ name: '', capacity: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassroom({ ...classroom, [name]: value });
  };

  const handleSubmit = () => {
    // Submit new classroom data to backend
  };

  return (
    <div>
      <h2>Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Classroom Name:
          <input type="text" name="name" value={classroom.name} onChange={handleChange} />
        </label>
        <label>
          Capacity:
          <input type="number" name="capacity" value={classroom.capacity} onChange={handleChange} />
        </label>
        <button type="submit">Create Classroom</button>
      </form>
    </div>
  );
}

export default CreateClassroom;
