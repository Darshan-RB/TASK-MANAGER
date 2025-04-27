import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask'; // Import CreateTask
import Register from './components/Register'; // Import Register component
import Login from './components/Login'; // Import Login component
import UserTasks from './components/UserTasks'; // Import UserTasks component
import MyAssignedTasks from './components/MyAssignedTasks';


function App() {
  return (
    <Router>
      <div>
        <h1>Task Mate</h1>
        <Routes>
        <Route path="/" element={<Login />} />

          {/* Routes for Authentication */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Routes for Task Management */}
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/assigned-tasks" element={<MyAssignedTasks />} />
          

          <Route path="/usertasks/:userId" element={<UserTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
