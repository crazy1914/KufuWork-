import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // For styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/employees">Employees</Link>
        </li>
        <li>
          <Link to="/admin/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;