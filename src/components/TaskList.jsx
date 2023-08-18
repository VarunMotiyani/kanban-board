import React, { useState, useEffect } from 'react';
import Task from './Task'; // Adjust the import path
import { fetchTasks } from '../services/ApiService'; // Adjust the import path

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks.tickets);
      setUsers(fetchedTasks.users);
    }

    fetchData();
  }, []);
//   console.log(users)

  const updateTaskStatus = (taskId, newStatus) => {
    // Find the task in the tasks array by taskId
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    // Update the state with the modified tasks array
    setTasks(updatedTasks);
  };

  return (
    <div>

{tasks.map(task => (
  <Task key={task.id} task={task} updateTaskStatus={updateTaskStatus}  />
  
))}

    </div>
  );
};

export default TaskList;
