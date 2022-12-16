import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userEvents = useSelector(store => store.userEventsReducer);
  console.log('userEvents are', userEvents)

  // on page load, fetching all the events 
  // that user is registered for
  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_EVENTS'
    })
  }, [])


  return (
    <div className="container">
      <h2>Welcome, {user.fname} {user.lname}!</h2>
      <div>
      <img src={user.profilePic} style={{border:'1px solid black',borderRadius:'50%', height:'200px'}}/>
      </div>
      <p> Name: {user.fname} {user.lname}</p>
      <p> Pronouns: {user.pronouns}</p>
      <p> Email: {user.username}</p>

      <form>
      <label>
          Your access level is:
        </label>
        <p >
          {user.userType == 1 && (
            <p>Volunteer</p>
          )}
          {user.userType == 2 && (
            <p>Mentee/Youth</p>
          )}
          {user.userType == 3 && (
            <p>Caregiver</p>
          )}
          {user.userType == 4 && (
            <p>Mentor</p>
          )}
          {user.userType == 5 && (
            <p>Admin</p>
          )}
        </p>
      </form>

      <article>Bio: {user.bio}</article>
      <Link to={`/profilepage/${user.id}/edit`}>
      <button>Edit Profile</button>
      </Link>

      <div>
        {(user.userType < 5) && (
          <div>
        <h2>
          Your Upcoming Events...
        </h2>
        <Link to = "/EventList">Go to Calendar </Link>
        <div>
          {userEvents.map(event => (
            <div className='user-events'
            key = {event.id} onClick = {() => {history.push(`/EventDetails/${event.id}`)}}>
              {event.name}
            </div>
          ))}
        </div>

        <Button variant={'outlined'}>Delete</Button>
        </div>
        )}
      </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
