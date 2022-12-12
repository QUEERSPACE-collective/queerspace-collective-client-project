import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

function ProfilePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      
     
      
      <img src='./images/belle.jpg' style={{border:'1px solid black',borderRadius:'50%', height:'350px'}}/>
      <caption>Edit User</caption>
      <select>
        
      <option disabled selected hidden>Type</option>
      <option>Mentor</option>
      <option>Mentee</option>
      <option>Caregiver</option>
      <option>Volunteer</option>


      </select>
      <p> Name____ </p>
      <p> Pronouns____ </p>
      <p> Email____ </p>
      <p>Mentor____<button>Search Mentors</button></p>
      <button>Edit Profile</button>
      <article>Bio_____________</article>
      <div>
        <h2>
          Your Upcoming Events...
        </h2>
        <p>Map through user's saved events list....</p>
        <Link to = "/EventList">Go to Calendar </Link>
        <button>Delete</button>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
