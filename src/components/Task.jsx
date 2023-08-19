import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  fetchTasks
} from '../services/ApiService';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RunCircleOutlinedIcon from '@mui/icons-material/RunCircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SignalCellularAlt1BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt1BarOutlined';
import SignalCellularAlt2BarOutlinedIcon from '@mui/icons-material/SignalCellularAlt2BarOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const userColorMapping = {}; // Color mapping object to store user colors

const Task = ({
  task,
  updateTaskStatus
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || '');

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    updateTaskStatus(task.id, newStatus);
    handleOptionsClose();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userInitials = task.userId.split('-').map(word => word[0]).join('');
  const avatarBackgroundColor = getRandomColor(task.userId); // Get a consistent color for the avatar background

  const renderPriorityIcon = () => {
    if (grouping !== 'priority') {
      if (task.priority === 0) return <NotInterestedIcon className="priority-icon" />;
      if (task.priority === 1) return <SignalCellularAlt1BarOutlinedIcon className="priority-icon" />;
      if (task.priority === 2) return <SignalCellularAlt2BarOutlinedIcon className="priority-icon" />;
      if (task.priority === 3) return <SignalCellularAltOutlinedIcon className="priority-icon" />;
      if (task.priority === 4) return <AssignmentLateOutlinedIcon className="priority-icon" />;
    }
    return null;
  };

  const renderStatusIcon = () => {
    if (grouping !== 'status') {
      if (task.status === 'Backlog') return <HighlightOffOutlinedIcon className="status-icon" />;
      if (task.status === 'Todo') return <CircleOutlinedIcon className="status-icon" />;
      if (task.status === 'In progress') return <RunCircleOutlinedIcon className="status-icon" />;
      if (task.status === 'Done') return <CheckCircleOutlinedIcon className="status-icon" />;
      if (task.status === 'Cancelled') return <CancelOutlinedIcon className="status-icon" />;
    }
    return null;
  };

  return (
    <Card sx={{ borderRadius: '10px', width: '100%', maxWidth: 1000, margin: '0 auto 13px', display: 'flex', flexDirection: 'column', minHeight: expanded ? 'auto' : '100%' }}>
      <CardHeader
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>{renderStatusIcon()}</Box>{task.id}
            <Avatar sx={{ bgcolor: avatarBackgroundColor, marginBottom: '-8px', width: '25px', height: '25px', marginLeft: 'auto' }}>
              <Typography sx={{ fontSize: '0.8rem' }}>{userInitials}</Typography>
            </Avatar>
          </Box>
        }
        sx={{ paddingBottom: '4px' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography sx={{ variant: 'h6', fontSize: '1rem', textAlign: 'left', lineHeight: '1.5rem', marginTop: '-8px', marginBottom: '8px' }}>
          <Box
            overflow="hidden"
            textOverflow={expanded ? 'unset' : 'ellipsis'}
            whiteSpace={expanded ? 'normal' : 'nowrap'}
            onClick={handleExpandClick}
            style={{ cursor: 'pointer' }}
          >
            {task.title}
          </Box>
        </Typography>
        {task.title.length > 50 && !expanded && (
          <Typography variant="body2" color="text.secondary">
            {/* <IconButton onClick={handleExpandClick} aria-label="read-more">
              Read More
            </IconButton> */}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            {renderPriorityIcon()}
          </Box>
          {task.tag}

          <IconButton aria-label="options" onClick={handleOptionsClick}>
            <MoreHorizIcon sx={{ color: 'grey' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleOptionsClose}
          >
            {task.status !== 'Todo' && (
              <MenuItem onClick={() => handleStatusChange('Todo')}>Todo</MenuItem>
            )}
            {task.status !== 'In progress' && (
              <MenuItem onClick={() => handleStatusChange('In progress')}>In progress</MenuItem>
            )}
            {task.status !== 'Done' && (
              <MenuItem onClick={() => handleStatusChange('Done')}>Done</MenuItem>
            )}
            {task.status !== 'Backlog' && (
              <MenuItem onClick={() => handleStatusChange('Backlog')}>Backlog</MenuItem>
            )}
            {task.status !== 'Cancelled' && (
              <MenuItem onClick={() => handleStatusChange('Cancelled')}>Cancelled</MenuItem>
            )}
          </Menu>
        </Typography>
      </CardContent>
    </Card>
  );
};

// Function to generate a consistent color based on userId
function getRandomColor(userId) {
  if (!userColorMapping[userId]) {
    userColorMapping[userId] = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  return userColorMapping[userId];
}

export default Task;
