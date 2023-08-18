import React from 'react';
import { AppBar, Toolbar, Typography, FormControl, Button, Menu, MenuItem } from '@mui/material';
import '../styles/styles.css';

const Navbar = ({ handleGroupingChange, handleOrderingChange }) => {
  const [displayMenuAnchor, setDisplayMenuAnchor] = React.useState(null);
  const [groupingMenuAnchor, setGroupingMenuAnchor] = React.useState(null);
  const [orderingMenuAnchor, setOrderingMenuAnchor] = React.useState(null);

  const openDisplayMenu = (event) => {
    setDisplayMenuAnchor(event.currentTarget);
  };

  const closeDisplayMenu = () => {
    setDisplayMenuAnchor(null);
  };

  const openGroupingMenu = (event) => {
    setGroupingMenuAnchor(event.currentTarget);
  };

  const closeGroupingMenu = () => {
    setGroupingMenuAnchor(null);
  };

  const openOrderingMenu = (event) => {
    setOrderingMenuAnchor(event.currentTarget);
  };

  const closeOrderingMenu = () => {
    setOrderingMenuAnchor(null);
  };

  const handleGroupingOptionChange = (value) => {
    handleGroupingChange(value);
    closeGroupingMenu();
  };

  const handleOrderingOptionChange = (value) => {
    handleOrderingChange(value);
    closeOrderingMenu();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6">Task Board</Typography>
        <FormControl sx={{ marginLeft: 'auto' }}>
          <Button
            color="inherit"
            aria-controls="display-menu"
            aria-haspopup="true"
            variant="outlined"
            onClick={openDisplayMenu}
          >
            Display
          </Button>
          <Menu
            id="display-menu"
            anchorEl={displayMenuAnchor}
            keepMounted
            open={Boolean(displayMenuAnchor)}
            onClose={closeDisplayMenu}
          >
            <MenuItem>
              <Button
                aria-controls="grouping-menu"
                aria-haspopup="true"
                onClick={openGroupingMenu}
              >
                Grouping
              </Button>
              <Menu
                id="grouping-menu"
                anchorEl={groupingMenuAnchor}
                open={Boolean(groupingMenuAnchor)}
                onClose={closeGroupingMenu}
              >
                <MenuItem onClick={() => handleGroupingOptionChange('status')}>Status</MenuItem>
                <MenuItem onClick={() => handleGroupingOptionChange('user')}>User</MenuItem>
                <MenuItem onClick={() => handleGroupingOptionChange('priority')}>Priority</MenuItem>
              </Menu>
            </MenuItem>
            <MenuItem>
              <Button
                aria-controls="ordering-menu"
                aria-haspopup="true"
                onClick={openOrderingMenu}
              >
                Ordering
              </Button>
              <Menu
                id="ordering-menu"
                anchorEl={orderingMenuAnchor}
                open={Boolean(orderingMenuAnchor)}
                onClose={closeOrderingMenu}
              >
                <MenuItem onClick={() => handleOrderingOptionChange('priority')}>Priority</MenuItem>
                <MenuItem onClick={() => handleOrderingOptionChange('title')}>Title</MenuItem>
              </Menu>
            </MenuItem>
          </Menu>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
