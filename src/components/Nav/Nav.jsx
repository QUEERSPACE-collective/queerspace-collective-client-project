import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">QUEERSPACE collective</h2>
        <img src='./images/queerspaceLogo.png' className='logo'/>

        </Link>
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
        
        {/* if the user is an admin, show these links */}
        {user.userType === 5 && (
          <>
          <Link className="navLink" to="/AllEventsList">
            All Events
          </Link>
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
