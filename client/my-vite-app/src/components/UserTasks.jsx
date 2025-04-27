import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserTask.css'; // Import your CSS file

const UserTasks = () => {
  const { userId } = useParams(); // Extract userId from URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/tasks/${userId}`);
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
    }
  };

  // ✅ ADD THIS FUNCTION
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/${taskId}`, { status: newStatus });
      // After updating, refetch tasks to refresh the page
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className='user-tasks-container'>
      <h2>Tasks for User</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.title}</strong>: {task.description}
              <div><em><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</em></div>
              <div><strong>Priority:</strong> {task.priority || 'Not set'}</div>

              {/* ✅ Use the function on buttons */}
              <button className="completed-btn" onClick={() => handleStatusUpdate(task._id, 'Completed')}>
                Completed
              </button>
              <button className="inprogress-btn" onClick={() => handleStatusUpdate(task._id, 'In-Progress')}>
                In-Progress
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTasks;
