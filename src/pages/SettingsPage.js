import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SettingsPage.css'; // For styling

const SettingsPage = () => {
  const [adminInfo, setAdminInfo] = useState({ name: '', email: '' });
  const [companyInfo, setCompanyInfo] = useState({ name: '' });

  // Fetch admin and company info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminRes = await axios.get('/api/admin/info');
        const companyRes = await axios.get('/api/admin/company-info');
        setAdminInfo(adminRes.data);
        setCompanyInfo(companyRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Handle admin info update
  const handleAdminUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin/update-info', adminInfo);
      alert('Admin information updated successfully');
    } catch (err) {
      console.error(err);
    }
  };

  // Handle company info update
  const handleCompanyUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin/update-company-info', companyInfo);
      alert('Company information updated successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="admin-settings">
        <h2>Admin Information</h2>
        <form onSubmit={handleAdminUpdate}>
          <input
            type="text"
            placeholder="Name"
            value={adminInfo.name}
            onChange={(e) => setAdminInfo({ ...adminInfo, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={adminInfo.email}
            onChange={(e) => setAdminInfo({ ...adminInfo, email: e.target.value })}
            required
          />
          <button type="submit">Update Admin Info</button>
        </form>
      </div>

      <div className="company-settings">
        <h2>Company Information</h2>
        <form onSubmit={handleCompanyUpdate}>
          <input
            type="text"
            placeholder="Company Name"
            value={companyInfo.name}
            onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
            required
          />
          <button type="submit">Update Company Info</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;