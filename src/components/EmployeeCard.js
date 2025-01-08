import React from 'react';
import './EmployeeCard.css'; // For styling

const EmployeeCard = ({ employee, onClick }) => {
  return (
    <div className="employee-card" onClick={onClick}>
      <h3>{employee.name}</h3>
      <p>{employee.role}</p>
    </div>
  );
};

export default EmployeeCard;