import React from 'react';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import QSClogo from '../QSClogo/QSClogo';
import Drawers from '../Drawer/Drawer';

import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <>
      {/* The drawer component dictates whether the user will see the
         hamburger menu or not, depending if the user is logged in or not. */}
      <div className="nav">

        <span className='drawersContainer'>
          <Drawers />
        </span>

        <header className='myHeader'>

          <Link to="/profilepage">
            <QSClogo />
          </Link>

          {/* SHOW THIS IF NOT LOGGED IN */}

         {!user.id && (
          <div className='webNavbar'>
            <Link to='./login'><p>Login</p></Link>
          </div>
          )}  

          {/* SHOW THIS IF THE USER IS AN ADMIN OR MENTOR */}
          
          {user.userType > 3 && (
          <div className='webNavbar'>
            <Link to='/profilepage'><p>Home</p></Link>
            <Link to='/eventlist'><p>Calendar</p></Link>
            <Link to='/resources'><p>Resources</p></Link>
            <Link to='/feedback'><p>Feedback Form</p> </Link>
            <Link to='/allusers'><p>Find members</p></Link>
            <Link to='/login' onClick={() => dispatch({ type: 'LOGOUT' })}><p> Logout</p></Link>
          </div>
          )} 

          {/* SHOW THIS IF THE USER IS NOT ADMIN OR MENTOR */}

          {user.userType < 4 && (
           <div className='webNavbar'>
            <Link to='/profilepage'><p>Home</p></Link>
            <Link to='/calendar'><p>Calendar</p></Link>
            <Link to='/allusers'><p>Find members</p></Link>
            <Link to='/login' onClick={() => dispatch({ type: 'LOGOUT' })}><p>Logout</p></Link>
          </div> 
           )} 
        
        </header>
      </div>
    </>
  );
}

export default Nav;