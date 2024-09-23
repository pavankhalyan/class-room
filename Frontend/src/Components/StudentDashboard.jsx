import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchClassroomData = async () => {
      try {
        const classroomResponse = await axios.get("/api/classrooms/student"); 
        setClassroom(classroomResponse.data);

        if (classroomResponse.data._id) {
          const studentsResponse = await axios.get(`/api/classrooms/${classroomResponse.data._id}/students`);
          setStudents(studentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching classroom and students data:", error);
      }
    };

    fetchClassroomData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <p>Welcome to the Student Dashboard. Here you can view your classmates and timetable.</p>

      {classroom ? (
        <div className="classroom-details">
          <h3>Classroom: {classroom.name}</h3>
          <p>Start Time: {classroom.startTime}</p>
          <p>End Time: {classroom.endTime}</p>
          <h4>Students:</h4>
          {students.length > 0 ? (
            <ul>
              {students.map((student) => (
                <li key={student._id}>{student.name}</li>
              ))}
            </ul>
          ) : (
            <p>No students enrolled yet.</p>
          )}
        </div>
      ) : (
        <p>Loading classroom data...</p>
      )}
    </div>
  );
};

export default StudentDashboard;
