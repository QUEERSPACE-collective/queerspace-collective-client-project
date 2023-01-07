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
      <div className="nav">
        <span className='drawersContainer'>
          <Drawers />
        </span>
        <header className='myHeader'>
          {user.id ?
            <Link to="./home">
              <QSClogo />
            </Link>
            :
            <Link to="./login">
              <QSClogo />
            </Link>
          }

          {user.userType > 3 && (
            <div className='webNavbar'>
              <Link to='/home'><p>Home</p></Link>
              <Link to='/eventlist'><p>Calendar</p></Link>
              <Link to='/resources'><p>Resources</p></Link>
              <Link to='/feedback'><p>Feedback Form</p> </Link>
              <Link to='/allusers'><p>Find Users</p></Link>
              {user.userType == 5 && (
                <>
                  <Link to='/adduserform'><p>Register Users</p></Link>
                  <Link to='/alleventslist'><p>Events List</p></Link>
                </>
              )}
              <Link to='/login' onClick={() => dispatch({ type: 'LOGOUT' })}><p> Logout</p></Link>
            </div>
          )}

          {/* show if NOT admin or mentor */}
          {user.userType < 4 && (
            <div className='webNavbar'>
              <Link to='/home'><p>Home</p></Link>
              <Link to='/eventlist'><p>Calendar</p></Link>
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