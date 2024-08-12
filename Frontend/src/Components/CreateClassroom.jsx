import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import "../Styles/CreateClassroom.css";

function CreateClassroom() {
  const [classroom, setClassroom] = useState({
    name: '',
    startTime: '',
    endTime: '',
    days: [],
    teacher: '',
    students: []
  });
  const [message, setMessage] = useState(''); // For success or error messages
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassroom({ ...classroom, [name]: value });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const values = value.split(',').map(v => v.trim()); // Split by commas and trim spaces
    setClassroom({ ...classroom, [name]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to create the classroom
      const response = await fetch('/api/classrooms/create-classroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classroom),
      });

      if (response.ok) {
        // Display success message
        setMessage('Classroom successfully created!');
        
        // Redirect to principal's homescreen or update homescreen
        setTimeout(() => {
          navigate('/principal-homescreen'); // Replace with the actual route
        }, 2000); // Delay to show the message before redirecting
      } else {
        setMessage('Failed to create classroom. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.',error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Classroom</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Classroom Name:
            <input type="text" name="name" value={classroom.name} onChange={handleChange} required />
          </label>
          <label className="label">
            Start Time:
            <input type="text" name="startTime" value={classroom.startTime} onChange={handleChange} required />
          </label>
          <label className="label">
            End Time:
            <input type="text" name="endTime" value={classroom.endTime} onChange={handleChange} required />
          </label>
          <label className="label">
            Days:
            <input type="text" name="days" value={classroom.days.join(', ')} onChange={handleArrayChange} required placeholder="e.g., Monday, Tuesday" />
          </label>
          <label className="label">
            Teacher ID:
            <input type="text" name="teacher" value={classroom.teacher} onChange={handleChange} required />
          </label>
          <label className="label">
            Student IDs:
            <input type="text" name="students" value={classroom.students.join(', ')} onChange={handleArrayChange} placeholder="e.g., 123, 456" />
          </label>
          <button type="submit">Create Classroom</button>
        </form>
        {message && <p className="message">{message}</p>} {/* Display message */}
      </div>
    </div>
  );
}

export default CreateClassroom;
