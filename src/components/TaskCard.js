import React from 'react';
import './TaskCard.css'; // For styling

const TaskCard = ({ task, onClick }) => {
  return (
    <div className="task-card" onClick={onClick}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Assigned to: {task.assignedTo.name}</p>
    </div>
  );
};

export default TaskCard;