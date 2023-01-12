import React from 'react';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import QSClogo from '../QSClogo/QSClogo';
import MobileNavBar from '../MobileNavBar/MobileNavBar';

import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

// This is the nav bar for computers, it has different renders based on what level of access an account has on the webpage
function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="nav">
        <span className='drawersContainer'>
          <MobileNavBar />
        </span>
        <header className='myHeader'>
          {user.id ?
            <Link to="/homepage">
              <QSClogo />
            </Link>
            :
            <Link to="./login">
              <QSClogo />
            </Link>
          }

          {user.userType > 3 && (
            <div className='webNavbar'>
              <Link to='/homepage'><p>Home</p></Link>
              <Link to='/eventcalendar'><p>Calendar</p></Link>
              <Link to='/resources'><p>Resources</p></Link>
              <Link to='/mentorfeedbackform'><p>Feedback Form</p> </Link>
              <Link to='/allusers'><p>Find Users</p></Link>
              {user.userType == 5 && (
                <>
                  <Link to='/adduserform'><p>Register Users</p></Link>
                  <Link to='/allevents'><p>Events List</p></Link>
                </>
              )}
              <Link to='/login' onClick={() => dispatch({ type: 'LOGOUT' })}><p> Logout</p></Link>
            </div>
          )}

          {/* show if NOT admin or mentor */}
          {user.userType < 4 && (
            <div className='webNavbar'>
              <Link to='/homepage'><p>Home</p></Link>
              <Link to='/eventcalendar'><p>Calendar</p></Link>
              <Link to='/allusers'><p>Find Users</p></Link>
              <Link to='/login' onClick={() => dispatch({ type: 'LOGOUT' })}><p>Logout</p></Link>
            </div>
          )}
        </header>
      </div>
    </>
  );
}

export default Nav;