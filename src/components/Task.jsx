import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Task = ({ task, updateTaskStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);

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
  const avatarBackgroundColor = getRandomColor(); // Get a random color for the avatar background

  return (
    <Card sx={{ borderRadius: '10px', width: '100%', maxWidth: 800, margin: '0 auto 13px', display: 'flex', flexDirection: 'column', minHeight: expanded ? 'auto' : '100%' }}>
      <CardHeader
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {task.id}
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
            {task.status !== 'On Hold' && (
              <MenuItem onClick={() => handleStatusChange('On Hold')}>On Hold</MenuItem>
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

// Function to generate a random color in hexadecimal format
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export default Task;
