import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', grade: 'A' },
    { id: 2, name: 'Jane Smith', grade: 'B' },
    // Add more students here
  ]);

  const handleEdit = (id) => {
    // Logic for editing a student's details
    console.log(`Edit student with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="flex h-screen mr-[605px]">
      <div className="w-64 bg-gray-800 text-white p-6">
        <h3 className="text-lg font-semibold mb-4">Teacher Actions</h3>
        <ul>
          <li className="mb-2 hover:bg-gray-700 p-2 rounded">
            See the list of Students
          </li>
          {/* Add more actions as needed */}
        </ul>
      </div>

      <div className="flex-1 p-6 ">
        <h2 className="text-2xl font-semibold mb-4">Teacher Dashboard</h2>
        <p className="mb-6">Welcome to the Teacher Dashboard. Here you can manage your students and timetable.</p>

        <h3 className="text-xl font-semibold mb-4">Student List</h3>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left">ID</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Grade</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-200">{student.id}</td>
                <td className="px-4 py-2 border-b border-gray-200">{student.name}</td>
                <td className="px-4 py-2 border-b border-gray-200">{student.grade}</td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
