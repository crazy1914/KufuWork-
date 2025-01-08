import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import AddTaskPopup from '../components/AddTaskPopup';
import EditTaskPopup from '../components/EditTaskPopup';
import './TasksPage.css'; // For styling

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/admin/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  // Handle task card click
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowEditPopup(true);
  };

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      <button onClick={() => setShowAddPopup(true)}>Add Task</button>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onClick={() => handleTaskClick(task)}
          />
        ))}
      </div>

      {showAddPopup && (
        <AddTaskPopup
          onClose={() => setShowAddPopup(false)}
          onAdd={(newTask) => setTasks([...tasks, newTask])}
        />
      )}

      {showEditPopup && (
        <EditTaskPopup
          task={selectedTask}
          onClose={() => setShowEditPopup(false)}
          onUpdate={(updatedTask) => {
            setTasks(tasks.map((t) =>
              t._id === updatedTask._id ? updatedTask : t
            ));
          }}
        />
      )}
    </div>
  );
};

export default TasksPage;