import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TaskList.css'; // Import your CSS file for styling

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State to hold task list
  const [loading, setLoading] = useState(true); // To show a loading state while fetching tasks

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/tasks') // Adjust the URL if necessary
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="task-list-container">
      <h1>Task List</h1>

      {/* Link to the Create Task page */}
      <Link to="/create">
        <button>Create New Task</button>
      </Link>

      {/* Display loading state */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div>
          {/* Check if there are any tasks */}
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            <ul>
              {/* Loop through tasks and display each one */}
              {tasks.map((task) => (
                <li key={task._id}>
                  <h3>{task.title}</h3>
                  <p><strong>Assignee:</strong> {task.assignedTo?.name || 'N/A'}</p>
                  <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>

                  <p><strong>Priority:</strong>{' '}
                    <span className={`priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </p>

                  {/* Show Link if available */}
                  {task.link && (
                    <p>
                      <strong>Link:</strong>{' '}
                      <a href={task.link} target="_blank" rel="noopener noreferrer">
                        {task.link}
                      </a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
