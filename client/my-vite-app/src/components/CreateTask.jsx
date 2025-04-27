


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateTask.css';



const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('');
  const [userName, setUserName] = useState('');
  const [link, setLink] = useState('');




  const navigate = useNavigate();

    useEffect(() => {
      const name=localStorage.getItem('userName');
      if (name) setUserName(name);

      axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }, []);


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
    const createdBy = localStorage.getItem('userId');
    if (!taskName || !description || !selectedUser || !dueDate || !priority) {
      alert('Please fill all fields.');
      return;
    }
  
    const taskData = {
      title: taskName,
      description: description,
      assignedTo: selectedUser,
      dueDate: dueDate ,// ✅ add dueDate here
      priority: priority,
      createdBy: createdBy,
    };
  
    setLoading(true);
    axios.post('http://localhost:5000/tasks', taskData)
      .then(response => {
        setLoading(false);
        console.log('Task created:', response.data);
        setTaskName('');
        setDescription('');
        setSelectedUser('');
        setDueDate(null); // ✅ clear calendar input
        setPriority('');
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
    <div className="create-task-container">
      <div className="box"></div>
      <h3>Welcome, {userName}</h3>

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
        <div>
  <label>Due Date:</label>
  <DatePicker
    selected={dueDate}
    onChange={(date) => setDueDate(date)}
    dateFormat="yyyy-MM-dd"
    placeholderText="Select a date"
    minDate={new Date()} // Prevent past dates
    required
  />
 <div> <label>Priority:</label>
<select value={priority} onChange={(e) => setPriority(e.target.value)} required>
  <option value="">Select Priority</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select></div>
<div>
  <label>Link:</label>
  <input
    type="url"
    value={link}
    onChange={(e) => setLink(e.target.value)}
    placeholder="Enter a link (optional)"
  />
</div>


</div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Task...' : 'Create Task'}
        </button>
      </form>

      <br />
      <button onClick={handleViewMyTasks}>View My Tasks</button>
      <button onClick={() => navigate('/assigned-tasks')}>Tasks Assigned By Me</button>
      

    </div>
  );
};

export default CreateTask;
