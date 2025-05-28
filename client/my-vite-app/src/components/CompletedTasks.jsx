import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CompletedTasks.css'; // optional styling

const CompletedTasks = () => {
  const { userId } = useParams();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompletedTasks();
  }, [userId]);

  const fetchCompletedTasks = async () => {
    try {
      const res = await axios.get(`http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/tasks/${userId}`);
      const completed = res.data.filter(task => task.status === 'Completed');
      setCompletedTasks(completed);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch completed tasks');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading completed tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className='completed-tasks-container'>
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>Complete Your Tasks Soon!</p>
      ) : (
        <ul>
          {completedTasks.map(task => (
            <li key={task._id}>
              <strong>{task.title}</strong>: {task.description}
              {/* <div><em><strong>Completed on:</strong> {new Date(task.updatedAt).toLocaleDateString()}</em></div> */}
              <div className="parent-container">
  <strong className={`prio ${task.priority.toLowerCase()}`}>{task.priority}</strong>
</div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;
