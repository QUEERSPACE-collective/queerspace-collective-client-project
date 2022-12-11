import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import './Drawer.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';

import CottageIcon from '@mui/icons-material/Cottage';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MoodIcon from '@mui/icons-material/Mood';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useSelector } from 'react-redux';

function Drawers() {
  const user = useSelector((store) => store.user); 
  //Allows us to determine what the user sees,
  // whether they are logged in or not

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
// 1. CONST LIST IS WHAT WILL SHOW FOR ADMIN AND MENTORS
  const list = (anchor) => (
    <Router>
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List className='drawerText' sx={{ p: 0 }}>
          {[<Link to='./home'><p>Home</p></Link>,
          <Link to='./calendar'><p>Calendar</p></Link>,
          <Link to='./resources'><p>Resources</p></Link>,
          <Link to='./feedback'><p>Feedback Form</p> </Link>,
          <Link to='./findmembers'><p>Find members</p></Link>].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ p: 0 }} className='drawerPadding'>
                <ListItemIcon  >
                  {index == 0 ? <Link to='./home'><p><CottageIcon /> </p></Link> :
                    index == 1 ? <Link to='./calendar'><p><CalendarMonthIcon /></p></Link> :
                      index == 2 ? <Link to='./resources'><p><HomeRepairServiceIcon /></p></Link> :
                        index == 3 ? <Link to='./feedback'><p><MoodIcon /> </p></Link> :
                          index == 4 ? <Link to='./findmembers'><p><PersonSearchIcon /></p></Link> : ""}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text) => (
            <Link to='./login'>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <LogoutIcon>
                    <InboxIcon/>
                  </LogoutIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Router>
  );
// 1. END MENTOR/ADMIN LIST 


// 2. CONST LIST 2 IS WHAT VOLUNTEERS, MENTEES/YOUTH, AND CAREGIVERS WILL SEE
  const list2 = (anchor) => (
    <Router>
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List className='drawerText' sx={{ p: 0 }}>
          {[<Link to='./home'><p>Home</p></Link>,
          <Link to='./calendar'><p>Calendar</p></Link>,
          <Link to='./findmembers'><p>Find members</p></Link>].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ p: 0 }} className='drawerPadding'>
                <ListItemIcon  >
                  {index == 0 ? <Link to='./home'><p><CottageIcon /> </p></Link> :
                    index == 1 ? <Link to='./calendar'><p><CalendarMonthIcon /></p></Link> :
                          index == 2 ? <Link to='./findmembers'><p><PersonSearchIcon /></p></Link> : ""}
                </ListItemIcon>
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text) => (
            <Link to='./login'>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <LogoutIcon>
                    <InboxIcon/>
                  </LogoutIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Router>
  );

  // 2. END LIST FOR VOLUNTEERS, MENTEES/YOUTH, AND CAREGIVERS

  return (
    // 3. IF USER IS NOT LOGGED IN
    <>
      <div>
        {!user.id && (
          <div>
            <Redirect to='/home'></Redirect> 
            {/* Set to 'home' right now, could also be 'login' page */}
            {/* Whenever the page is reloaded, it will take us back to /home */}
            <Link className="navLink navLogin" to="/login"  >
              Login
            </Link> 
          </div>
        )}
      </div>
    {/* 3. END  */}


{/* 4. IF USER.ID IS TRUE, AND USER.USERTYPE == ADMIN OR MENTOR */}
{/* 4. THIS SHOWS THE DRAWER IN CONST LIST ( 1. ) */}
      <div className='drawerContainer'>
        {user.id &&   (

  // WILL BE GRABBING THE USER TYPE AND ADDING THE CONDITIONAL RENDER TO
  // LINE 167 ABOVE (USER.ID && USER.USERTYPE == ADMIN || MENTOR)

          ['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
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
  {/* 4. END */}

{/* 5. IF USER.ID IS TRUE AND USER.USERTYPE == YOUTH OR VOLUNTEER, THEN DISPLAY
  THE DRAWER WITHOUT RESOURCES AND FEEDBACK LINKS ( CONST LIST2 ) */}

{/* <div className='drawerContainer'>
        {user.id && user.userType != ADMIN || user.userType != MENTOR (
          ['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list2(anchor)}
              </Drawer>
            </React.Fragment>
          ))
        )}
      </div>  */}
    </>
  );
}

export default Drawers;