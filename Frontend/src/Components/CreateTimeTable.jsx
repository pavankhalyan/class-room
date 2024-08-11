import React, { useState } from 'react';

function CreateTimetable() {
  const [timetable, setTimetable] = useState([]);

  const handleChange = (index, field, value) => {
    const newTimetable = [...timetable];
    newTimetable[index] = { ...newTimetable[index], [field]: value };
    setTimetable(newTimetable);
  };

  const addTimetableEntry = () => {
    setTimetable([...timetable, { subject: '', time: '' }]);
  };

  const handleSubmit = () => {
    // Submit timetable to backend
  };

  return (
    <div>
      <h2>Create Timetable</h2>
      <button onClick={addTimetableEntry}>Add Entry</button>
      {timetable.map((entry, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Subject"
            value={entry.subject}
            onChange={(e) => handleChange(index, 'subject', e.target.value)}
          />
          <input
            type="text"
            placeholder="Time"
            value={entry.time}
            onChange={(e) => handleChange(index, 'time', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Save Timetable</button>
    </div>
  );
}

export default CreateTimetable;
