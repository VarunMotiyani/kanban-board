import React from 'react';
import {
  AppBar,
  Toolbar,
  FormControl,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SegmentIcon from '@mui/icons-material/Segment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

  const handleClearLocalStorage = () => {
    localStorage.clear(); // Clear local storage
    window.location.reload(); // Reload the page to reflect the changes
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Button
          color="inherit"
          aria-controls="display-menu"
          aria-haspopup="true"
          variant="outlined"
          onClick={openDisplayMenu}
          style={{ color: 'black', fontWeight: 'bold' }}
        >
          <SegmentIcon />
          Display
          <ArrowDropDownIcon />
        </Button>
        <Menu
          id="display-menu"
          anchorEl={displayMenuAnchor}
          keepMounted
          open={Boolean(displayMenuAnchor)}
          onClose={closeDisplayMenu}
        >
          {/* <MenuItem onClick={closeDisplayMenu}>
            <ListItemIcon>
              <SegmentIcon />
            </ListItemIcon>
            <ListItemText primary="Display" />
          </MenuItem>
          <Divider /> */}
          <MenuItem onClick={openGroupingMenu}>
            <ListItemIcon>
              <SegmentIcon />
            </ListItemIcon>
            <ListItemText primary="Grouping" />
            <ArrowDropDownIcon />
          </MenuItem>
          <Menu
            id="grouping-menu"
            anchorEl={groupingMenuAnchor}
            open={Boolean(groupingMenuAnchor)}
            onClose={closeGroupingMenu}
          >
            <MenuItem onClick={() => handleGroupingOptionChange('status')}>
              Status
            </MenuItem>
            <MenuItem onClick={() => handleGroupingOptionChange('user')}>
              User
            </MenuItem>
            <MenuItem onClick={() => handleGroupingOptionChange('priority')}>
              Priority
            </MenuItem>
          </Menu>
          <MenuItem onClick={openOrderingMenu}>
            <ListItemIcon>
              <SegmentIcon />
            </ListItemIcon>
            <ListItemText primary="Ordering" />
            <ArrowDropDownIcon />
          </MenuItem>
          <Menu
            id="ordering-menu"
            anchorEl={orderingMenuAnchor}
            open={Boolean(orderingMenuAnchor)}
            onClose={closeOrderingMenu}
          >
            <MenuItem onClick={() => handleOrderingOptionChange('priority')}>
              Priority
            </MenuItem>
            <MenuItem onClick={() => handleOrderingOptionChange('title')}>
              Title
            </MenuItem>
          </Menu>
        </Menu>
        <FormControl sx={{ marginLeft: 'auto' }}>
          <Button
            color="inherit"
            onClick={handleClearLocalStorage}
            style={{ color: 'black', fontWeight: 'bold' }}
          >
            <ClearAllIcon sx={{ marginRight: 1 }} />
            Clear Options
          </Button>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
