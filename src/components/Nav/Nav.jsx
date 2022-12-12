import React from 'react';
import './Nav.css';
import { useSelector } from 'react-redux';
import QSClogo from '../QSClogo/QSClogo';
import Drawers from '../Drawer/Drawer';

import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
      {/* The drawer component dictates whether the user will see the
         hamburger menu or not, depending if the user is logged in or not. */}
      <div className="nav">

        <span className='drawersContainer'>
          <Drawers />
        </span>

        <header className='myHeader'>

          <Link to="/home">
            <QSClogo />
          </Link>

        {/* if the user is an admin, show these links */}
        
        {/* {user.userType === 5 && (
          <>
          <Link className="navLink" to="/AllEventsList">
            All Events
          </Link>
          </>
        )} */}

          {/* Hide these initially, and change visibility depending on screen size */}
          {/* If these are showing, then the Drawer will not be */}

          {/* SHOW THIS IF NOT LOGGED IN */}

         {!user.id && (
          <div className='webNavbar'>
            <Link to='./login'><p>Login</p></Link>
          </div>
          )}  

          {/* SHOW THIS IF THE USER IS AN ADMIN OR MENTOR */}
          
{/* I REGRET HAVING TO DO THIS I'M SORRY */}
          {user.userType === 5 && (
          <div className='webNavbar'>
            <Link to='./home'><p>Home</p></Link>
            <Link to='./calendar'><p>Calendar</p></Link>
            <Link to='./resources'><p>Resources</p></Link>
            <Link to='./feedback'><p>Feedback Form</p> </Link>
            <Link to='./alluserslist'><p>Find members</p></Link>
            <Link to='./login'><p>Logout</p></Link>
          </div>
          )} 

{user.userType === 4 && (
          <div className='webNavbar'>
            <Link to='./home'><p>Home</p></Link>
            <Link to='./calendar'><p>Calendar</p></Link>
            <Link to='./resources'><p>Resources</p></Link>
            <Link to='./feedback'><p>Feedback Form</p> </Link>
            <Link to='./alluserslist'><p>Find members</p></Link>
            <Link to='./login'><p>Logout</p></Link>
          </div>
          )} 
          {/* SHOW THIS IF THE USER IS NOT ADMIN OR MENTOR */}

          {user.userType === 3 && (
           <div className='webNavbar'>
            <Link to='./home'><p>Home</p></Link>
            <Link to='./calendar'><p>Calendar</p></Link>
            <Link to='./alluserslist'><p>Find members</p></Link>
            <Link to='./login'><p>Logout</p></Link>
          </div> 
           )} 
           {user.userType === 2 && (
           <div className='webNavbar'>
            <Link to='./home'><p>Home</p></Link>
            <Link to='./calendar'><p>Calendar</p></Link>
            <Link to='./alluserslist'><p>Find members</p></Link>
            <Link to='./login'><p>Logout</p></Link>
          </div> 
           )} 
           {user.userType === 1 && (
           <div className='webNavbar'>
            <Link to='./home'><p>Home</p></Link>
            <Link to='./calendar'><p>Calendar</p></Link>
            <Link to='./alluserslist'><p>Find members</p></Link>
            <Link to='./login'><p>Logout</p></Link>
          </div> 
           )} 
        </header>
      </div>
    </>
  );
}

export default Nav;