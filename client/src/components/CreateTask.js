


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !description || !selectedUser) {
      alert('Please fill all fields.');
      return;
    }

    const taskData = {
      title: taskName,
      description: description,
      assignedTo: selectedUser,
    };

    setLoading(true);
    axios.post('http://localhost:5000/tasks', taskData)
      .then(response => {
        setLoading(false);
        console.log('Task created:', response.data);
        setTaskName('');
        setDescription('');
        setSelectedUser('');
      })
      .catch(error => {
        setLoading(false);
        console.error('Error creating task:', error);
      });
  };

  const handleViewMyTasks = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/usertasks/${userId}`);
    } else {
      alert('Login required to view your tasks.');
    }
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Assignee:</label>
          <select value={selectedUser} onChange={handleUserChange} required>
            <option value="">Select Assignee</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>

      <br />
      <button onClick={handleViewMyTasks}>View My Tasks</button>
    </div>
  );
};

export default CreateTask;
