import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import AddEmployeePopup from '../components/AddEmployeePopup';
import EditEmployeePopup from '../components/EditEmployeePopup';
import './EmployeesPage.css'; // For styling

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('/api/admin/users');
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  // Handle employee card click
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditPopup(true);
  };

  return (
    <div className="employees-page">
      <h1>Employees</h1>
      <button onClick={() => setShowAddPopup(true)}>Add Employee</button>

      <div className="employee-list">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee._id}
            employee={employee}
            onClick={() => handleEmployeeClick(employee)}
          />
        ))}
      </div>

      {showAddPopup && (
        <AddEmployeePopup
          onClose={() => setShowAddPopup(false)}
          onAdd={(newEmployee) => setEmployees([...employees, newEmployee])}
        />
      )}

      {showEditPopup && (
        <EditEmployeePopup
          employee={selectedEmployee}
          onClose={() => setShowEditPopup(false)}
          onUpdate={(updatedEmployee) => {
            setEmployees(employees.map((emp) =>
              emp._id === updatedEmployee._id ? updatedEmployee : emp
            ));
          }}
        />
      )}
    </div>
  );
};

export default EmployeesPage;