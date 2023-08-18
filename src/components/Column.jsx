import React from 'react';
import Task from './Task';
// import TaskList from './TaskList';
import '../styles/styles.css';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RunCircleOutlinedIcon from '@mui/icons-material/RunCircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SignalCellularAlt1BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt1BarOutlined';
import SignalCellularAlt2BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt2BarOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const Column = ({ title, tasks, updateTaskStatus, dataStatus}) => {
  const getStatusIcon = () => {
    if (title === 'Backlog') {
      return <HighlightOffOutlinedIcon className="status-icon" />;
    } else if (title === 'Todo') {
      return <CircleOutlinedIcon className="status-icon" />;
    } else if (title === 'In progress') {
      return <RunCircleOutlinedIcon className="status-icon" />;
    } else if (title === 'Done') {
      return <CheckCircleOutlinedIcon className="status-icon" />;
    } else if (title === 'Cancelled') {
      return <CancelOutlinedIcon className="status-icon" />;
    } else if (title === 'No Priority') {
      return <NotInterestedIcon className="status-icon" />;
    } else if (title === 'Low') {
      return <SignalCellularAlt1BarOutlinedIcon className="status-icon" />;
    } else if (title === 'Medium') {
      return <SignalCellularAlt2BarOutlinedIcon className="status-icon" />;
    } else if (title === 'High') {
      return <SignalCellularAltOutlinedIcon className="status-icon" />;
    } else if (title === 'Urgent') {
      return <AssignmentLateOutlinedIcon className="status-icon" />;
    } else {
      return null;
    }
  };

  return (
    <div className="column" data-status={dataStatus}>
      <div className="column-header">
        <h2 className="column-title">
          <span className="title-icon">
            {getStatusIcon()} 
          </span>
          <span className='title'>{title}</span>
          <span className='title-length'>{tasks.length}</span>
          <span className="title-right">
          <AddIcon fontSize='small' className="column-icon" style={{ fontSize: '18px', color: 'grey' }} />
            <MoreHorizIcon className="column-icon" style={{ fontSize: '18px', color: 'grey' }} />
          </span>
        </h2>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <Task key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </div>
    </div>
  );
};

export default Column;
