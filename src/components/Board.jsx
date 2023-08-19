import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Column from './Column';
import { fetchTasks } from '../services/ApiService';
import '../styles/styles.css';
import TaskList from './TaskList';

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
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
          setTasks(storedTasks);
        } else {
          const data = await fetchTasks();
          setTasks(data.tickets);
          localStorage.setItem('tasks', JSON.stringify(data.tickets));
        }

        const data = await fetchTasks();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Retrieve grouping and ordering from localStorage on component mount
    const storedGrouping = localStorage.getItem('grouping');
    const storedOrdering = localStorage.getItem('ordering');
    if (storedGrouping) {
      setGrouping(storedGrouping);
    }
    if (storedOrdering) {
      setOrdering(storedOrdering);
    }
  }, []);

  useEffect(() => {
    // Store grouping and ordering in localStorage when they change
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('ordering', ordering);
  }, [grouping, ordering]);

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
      sortedTasks.sort((a, b) => b.priority - a.priority); // Ascending order by priority
    } else if (criteria === 'title') {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title)); // Ascending order by title
    }

    return sortedTasks;
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Adding a delay before applying the transition class
    await new Promise(resolve => setTimeout(resolve, 100));

    // Find the column element and add the transition class
    const column = document.querySelector(`[data-status="${newStatus}"]`);
    if (column) {
      column.classList.add('task-slide-down');
      // Removing the class after the transition completes
      setTimeout(() => column.classList.remove('task-slide-down'), 300);
    }
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
              dataStatus={user.name}
            />
          ))}
        {grouping !== 'user' &&
          Object.entries(groupedTasks).map(([group, groupTasks]) => (
            <Column
              key={group}
              title={group}
              tasks={sortTasks(groupTasks, ordering)}
              updateTaskStatus={updateTaskStatus}
              dataStatus={group}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;
