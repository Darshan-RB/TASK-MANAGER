import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserTasks = () => {
  const { userId } = useParams(); // Extract userId from URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchTasks();
  }, [userId]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Tasks for User</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.title}</strong>: {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTasks;
