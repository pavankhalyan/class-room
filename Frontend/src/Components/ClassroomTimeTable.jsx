import React, { useEffect, useState } from 'react';

function ClassroomTimetable() {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    // Fetch timetable data from backend
    // Example: setTimetable(response.data);
  }, []);

  return (
    <div>
      <h2>Classroom Timetable</h2>
      <ul>
        {timetable.map((entry, index) => (
          <li key={index}>{entry.subject} - {entry.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassroomTimetable;
