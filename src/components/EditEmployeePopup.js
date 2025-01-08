import React, { useState } from 'react';
import axios from 'axios';
import './EditEmployeePopup.css'; // For styling

const EditEmployeePopup = ({ employee, onClose, onUpdate }) => {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [role, setRole] = useState(employee.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/admin/edit-user/${employee._id}`, { name, email, role });
      onUpdate(res.data.user);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePopup;