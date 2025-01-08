import React, { useState } from 'react';
import axios from 'axios';
import './EditTaskPopup.css'; // For styling

const EditTaskPopup = ({ task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/admin/edit-task/${task._id}`, { title, description, assignedTo });
      onUpdate(res.data.task);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Task</h2>
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
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPopup;