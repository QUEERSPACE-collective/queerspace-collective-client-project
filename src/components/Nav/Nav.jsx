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

        {/* show login if not logged in*/}
         {!user.id && (
          <div className='webNavbar'>
            <Link to='./login'><p>Login</p></Link>
          </div>
          )}  

          {/* show if mentor or admin */}
          {/* may still need to add more (more socials?) */}
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

          {/* show if NOT admin or mentor */}
          {user.userType < 4 && (
            <div className='webNavbar'>        
              <Link to='/profilepage'><p>Home</p></Link>
              <Link to='/eventlist'><p>Calendar</p></Link>
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