import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import EmployeesPage from './EmployeesPage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';
import './AdminDashboard.css'; // For styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;