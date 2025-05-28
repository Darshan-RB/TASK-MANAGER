import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserTask.css'; // Import your CSS file

const UserTasks = () => {
  const { userId } = useParams(); // Extract userId from URL
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const activeTasks = tasks.filter(task => task.status !== 'Completed');
  const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState({});


useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const res = await axios.get('http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/users'); // adjust endpoint
    setUsers(res.data);
  } catch (err) {
    console.error('Failed to fetch users:', err);
  }
};

  
  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/tasks/${userId}`);
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
      await axios.patch(`http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/tasks/${taskId}`, { status: newStatus });
      // After updating, refetch tasks to refresh the page
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task status:', err);
    }

  };


  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/tasks/${taskId}`);
      fetchTasks(); // refresh after deletion
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleAssignTask = async (taskId, userId) => {
    try {
      await axios.patch(`http://tmown-env.eba-pbzuac8g.ap-south-1.elasticbeanstalk.com/tasks/${taskId}/assign`, { userId });
      fetchTasks(); // refresh task list
    } catch (err) {
      console.error('Failed to assign task:', err);
    }
  };
  

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className='user-tasks-container'>
      <h2>Tasks for User</h2>
      {activeTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {activeTasks.map(task => (
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
              <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
              {/* <select
  value={selectedUser[task._id] || ''}
  onChange={(e) => setSelectedUser({ ...selectedUser, [task._id]: e.target.value })}
>
  <option value="">Select user</option>
  {users.map((user) => (
    <option key={user._id} value={user._id}>{user.username}</option>
  ))}
</select> */}

{/* <button
  className="assign-btn"
  onClick={() => handleAssignTask(task._id, selectedUser[task._id])}
  disabled={!selectedUser[task._id]}
>
  Assign
</button> */}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTasks;
