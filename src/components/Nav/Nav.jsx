import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import QSClogo from '../QSClogo/QSClogo';
import Drawers from '../Drawer/Drawer';
function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      
        <header className='myHeader'>
        <Drawers/>
        <QSClogo/>
        <Link to="/home">
        </Link>
        </header>
      <div>

        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login
          </Link>
        )}

        {/* If a user is logged in, show these links */}
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

        <Link className="navLink" to="/AboutPage">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
