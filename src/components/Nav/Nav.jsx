import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import QSClogo from '../QSClogo/QSClogo';
import Drawers from '../Drawer/Drawer';
import LoginPage from '../LoginPage/LoginPage';

import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
     {/* The drawers component dictates whether the user will see the
         hamburger menu or not */}   
    <div className="nav">
      <span className='drawersContainer'>
        <Drawers />
      </span>
      <header className='myHeader'>
        <Link to="/home">
          <QSClogo />
        </Link>
        
      </header>
      
    </div>

    <div>
      {user.id && (
        <>
          <Link className="navLink" to="/user">
            Home
          </Link>

          <Link className="navLink" to="/info">
            Info Page
          </Link>

          <LogOutButton className="navLink" />
        </>
      )}

      
    </div>
    </>
  );
}

export default Nav;
