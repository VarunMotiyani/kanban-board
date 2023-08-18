import React from 'react';
import Task from './Task';
import TaskList from './TaskList';
import '../styles/styles.css';

const Column = ({ title, tasks, updateTaskStatus }) => {
  return (
    <div className="column">
        <div className="column-header">
      <h2 className="column-title">{title}</h2>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            updateTaskStatus={updateTaskStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
