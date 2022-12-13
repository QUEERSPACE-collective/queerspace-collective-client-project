import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//Currently using Links, but I've had issues with that in the past. If we have
// problems then we can switch to ' useHistory '
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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
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
  // Used to show whether the user is logged in or not

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
// 1. List is what will show for ADMIN AND MENTORS
  const list = (anchor) => (
    <Router>
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
{/* Below, I had to add <p> elements to the text and imports, as well as <Link to=>'s. 
  Without it, there was too much of a dead space between them and it would be very annoying
    for a regular user to use */}
  {/* Edan said I should fix this so we don't map through anything because it's confusing. Which it is. */}
        <List className='drawerText' sx={{ p: 0 }}>
          {[<Link to='./home'><p>Home</p></Link>,
          <Link to='./eventlist'><p>Calendar</p></Link>,
          <Link to='./resources'><p>Resources</p></Link>,
          <Link to='./feedback'><p>Feedback Form</p> </Link>,
          <Link to='./allusers'><p>Find members</p></Link>].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ p: 0 }} className='drawerPadding'>
                  {index == 0 ? <Link to='./home'><p><CottageIcon /> </p></Link> :
                    index == 1 ? <Link to='./eventlist'><p><CalendarMonthIcon /></p></Link> :
                      index == 2 ? <Link to='./resources'><p><HomeRepairServiceIcon /></p></Link> :
                        index == 3 ? <Link to='./feedback'><p><MoodIcon /> </p></Link> :
                          index == 4 ? <Link to='./allusers'><p><PersonSearchIcon /></p></Link> : ""}
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text) => (
            <Link to='./login' onClick={() => dispatch({ type: 'LOGOUT' })}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <LogoutIcon >
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


// 2. List2' IS WHAT VOLUNTEERS, MENTEES/YOUTH, AND CAREGIVERS WILL SEE.
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
          <Link to='./eventlist'><p>Calendar</p></Link>,
          <Link to='./allusers'><p>Find members</p></Link>].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton sx={{ p: 0 }} className='drawerPadding'>
                  {index == 0 ? <Link to='./home'><p><CottageIcon /> </p></Link> :
                    index == 1 ? <Link to='./eventlist'><p><CalendarMonthIcon /></p></Link> :
                    index == 2 ? <Link to='./allusers'><p><PersonSearchIcon /></p></Link> : ""}
                <ListItemText primary={text}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text) => (
            <Link to='./login' onClick={() => dispatch({ type: 'LOGOUT' })}>
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

  // 2. END 

  return (
    // 3. IF USER IS NOT LOGGED IN
    <>
      <div>
        {!user.id && (
          <div>
            <Redirect to='/home'></Redirect>                 
            <Link className="navLink navLogin" to="/login" >
              Login
            </Link> 
          </div>
        )}
      </div>
    {/* 3. END  */}

{/* 4. (List) */}
      <div className='drawerContainer'>
        {user.userType > 3 &&   (
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

{/* 5. (List2)*/}

<div className='drawerContainer'>
        {user.userType < 4 && (
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
      </div> 

{/* 5. END */}
    </>
  );
}

export default Drawers;