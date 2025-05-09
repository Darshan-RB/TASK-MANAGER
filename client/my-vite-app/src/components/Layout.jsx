// Layout.js
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.css'; // create CSS for layout

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  const handleViewMyTasks = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/usertasks/${userId}`);
    } else {
      alert('Login required to view your tasks.');
    }
  };

  return (
    <div className="layout-container">
      {!hideSidebar && (
        <div className="sidebar-menu">
          <h3>Welcome, {localStorage.getItem('userName')}</h3>
          <button onClick={() => navigate('/create')}>Create Task</button>
          <button onClick={handleViewMyTasks}>📋 My Tasks</button>
          <button onClick={() => navigate('/assigned-tasks')}>🧾 Assigned Tasks</button>
          <button
            onClick={() => {
              const userId = localStorage.getItem('userId');
              if (userId) {
                navigate(`/completed-tasks/${userId}`);
              } else {
                alert('Login required to view completed tasks.');
              }
            }}
          >
            ✅ View Completed Tasks
          </button>
          <button onClick={() => navigate('/login')}>Logout</button>
        </div>
      )}

      <div className="main-content">
        <Outlet /> {/* renders child pages */}
      </div>
    </div>
  );
};

export default Layout;
