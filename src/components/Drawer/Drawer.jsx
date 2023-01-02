import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Drawer.css';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import CottageIcon from '@mui/icons-material/Cottage';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MoodIcon from '@mui/icons-material/Mood';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useSelector, useDispatch } from 'react-redux';

function Drawers() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Router>
      {user.id && (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List className='drawerText' sx={{ p: 0 }}>
          <Link to='/user'>
            <p><CottageIcon className='iconAlign'/>Home</p>
          </Link>
          <Link to='/eventlist'>
            <p><CalendarMonthIcon className='iconAlign'/>Calendar</p>
          </Link>
          {user.userType > 3 && (
            <>
          <Link to='/resources'>
            <p><HomeRepairServiceIcon className='iconAlign'/>Resources</p>
          </Link>
          <Link to='/feedback'>
            <p><MoodIcon className='iconAlign'/>Feedback Form</p>
          </Link>
          </>
          )}
          <Link to='/allusers'>
            <p><PersonSearchIcon className='iconAlign'/>Find Users</p>
          </Link>
          {user.userType == 5 && (
            <>
            <Link to='/allEventsList'>
            <p><CalendarMonthIcon className='allEventsList'/>Events List</p>
          </Link>
            <Link to='/adduserform'>
              <p><PersonSearchIcon className='iconAlign'/>Register Users</p>
            </Link>
            </>
          )}
         
        </List>

        <Divider/>
            <List className="drawerListLogout" onClick={() => dispatch({ type: 'LOGOUT' })}>        
            <Link to='/login' >
              <LogoutIcon 
                className='iconAlign' 
                sx={{pl:'20px'}}>
              </LogoutIcon>
              <Button variant={'containedSizeSmall'}>
                Logout
              </Button>
            </Link>
        </List>
      </Box>
      )}
    </Router>
  );

return (
  <>
    <div className='drawerContainer'>
      {user.id &&   (
        ['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              <MenuIcon/>
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))
      )}
    </div>
  </>
);
}

export default Drawers;