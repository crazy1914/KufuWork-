import React, { useState } from 'react';
import axios from 'axios';
import './AddTaskPopup.css'; // For styling

const AddTaskPopup = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/create-task', { title, description, assignedTo });
      onAdd(res.data.task);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Select Employee</option>
            {/* Fetch and map employees here */}
          </select>
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;