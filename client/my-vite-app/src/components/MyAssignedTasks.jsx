import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyAssignedTasks.css'; // Import your CSS file

const MyAssignedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Login required');
      return;
    }

    axios.get(`http://localhost:5000/tasks/createdby/${userId}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div className='my-assigned-tasks'>
      <h2>Tasks Assigned By Me</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong> - Assigned to: {task.assignedTo?.name || 'N/A'}<br />
              Due: {new Date(task.dueDate).toLocaleDateString()} | Priority: {task.priority}
              <p>{task.description}</p>
              <p><strong>Status:</strong>{' '} 
              <span className={task.status === 'Completed' ? 'status-completed' : task.status === 'In-Progress' ? 'status-inprogress' : 'status-default'}>
                {task.status || 'Not updated'}
              </span>
            </p>


            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAssignedTasks;
