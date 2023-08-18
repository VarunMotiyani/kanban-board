import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Column from './Column';
import { fetchTasks } from '../services/ApiService';
import '../styles/styles.css';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(
    localStorage.getItem('grouping') || 'status'
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem('ordering') || 'priority'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);
 
  useEffect(() => {
    // Save tasks to Local Storage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const statusColumns = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const priorityColumns = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];

  const groupTasks = (tasks, criteria) => {
    const grouped = {};

    if (criteria === 'status') {
      statusColumns.forEach(column => {
        grouped[column] = tasks.filter(task => task.status === column);
      });
    } else if (criteria === 'priority') {
      priorityColumns.forEach(column => {
        grouped[column] = tasks.filter(task => task.priority === priorityColumns.indexOf(column));
      });
    } else if (criteria === 'user') {
      users.forEach(user => {
        grouped[user.name] = tasks.filter(task => task.userId === user.id);
      });
    }

    return grouped;
  };

  const sortTasks = (tasks, criteria) => {
    let sortedTasks = [...tasks];

    if (criteria === 'priority') {
      sortedTasks.sort((a, b) => a.priority - b.priority); // Ascending order by priority
    } else if (criteria === 'title') {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order by title
    }

    return sortedTasks;
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const groupedTasks = groupTasks(tasks, grouping);

  return (
    <div>
      <Navbar
        handleGroupingChange={setGrouping}
        handleOrderingChange={setOrdering}
      />
      <div className="board">
        {grouping === 'user' &&
          users.map(user => (
            <Column
              key={user.id}
              title={user.name}
              tasks={sortTasks(groupedTasks[user.name] || [], ordering)}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        {grouping !== 'user' &&
          Object.entries(groupedTasks).map(([group, groupTasks]) => (
            <Column
              key={group}
              title={group}
              tasks={sortTasks(groupTasks, ordering)}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;
