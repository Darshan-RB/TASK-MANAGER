import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask'; // Import CreateTask
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import Login component
import UserTasks from './components/UserTasks'; // Import UserTasks component

function App() {
  return (
    <Router>
      <div>
        <h1>Task Manager</h1>
        <Routes>
          {/* Routes for Task Management */}
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />

          {/* Routes for Authentication */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/usertasks/:userId" element={<UserTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
