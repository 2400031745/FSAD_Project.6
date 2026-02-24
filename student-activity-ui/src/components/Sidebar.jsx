import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
    toggleSidebar();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Globe.AI Portal</h3>
          <button className="close-btn" onClick={toggleSidebar}>×</button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
          <Link to="/activities" onClick={toggleSidebar}>My Activities</Link>
          <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
