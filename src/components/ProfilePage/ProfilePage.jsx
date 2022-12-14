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
      <h2>Welcome, {user.username}!</h2>
      
     
      
      <img src='./images/belle.jpg' style={{border:'1px solid black',borderRadius:'50%', height:'200px'}}/>
      <p>Edit User</p>
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


        <h2>
          Your Upcoming Events...
        </h2>
        <Link to = "/EventList">Go to Calendar </Link><br/>
        <div>
          {userEvents.map(event => (
            <div className='user-events'
            key = {event.id} onClick = {() => {history.push(`/EventDetails/${event.id}`)}}>
              {event.name}
            </div>
          ))}
        </div>

       

        <Button variant={'outlined'}>Delete</Button>
     
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ProfilePage;
