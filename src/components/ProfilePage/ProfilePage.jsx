import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ProfilePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userEvents = useSelector(store => store.userEventsReducer);
  console.log('userEvents are', userEvents)

  const handleChange = (event) => {
    console.log(event.target.value,'is evt.target.value')
  };
  // on page load, fetching all the events 
  // that user is registered for
  useEffect(() => {
    animater(), // Call fade effect
    dispatch({
      type: 'FETCH_USER_EVENTS'
    })
  }, [])
// Fade effect
  function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
  }
// end Fade effect
  return (
    <div className="container">
      <h2>Welcome, {user.fname} {user.lname}!</h2>
      <div>
      <img src={user.profilePic} style={{border:'1px solid black',borderRadius:'50%', height:'200px'}}/>
      </div>
      <p> Name: {user.fname} {user.lname}</p>
      <p> Pronouns: {user.pronouns}</p>
      <p> Email: {user.username}</p>

{/* For some reason, <select> was messing with my fade-in feature I'm messing with */}
       <FormControl  >
        <InputLabel id="demo-simple-select-label">user type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>Admin</MenuItem>
          <MenuItem value={1}>Mentee/Youth</MenuItem>
          <MenuItem value={2}>Mentor</MenuItem>
          <MenuItem value={3}>Volunteer</MenuItem>
          <MenuItem value={4}>Caregiver</MenuItem>
        </Select>
      </FormControl>
   {/* ..so I changed it to this- we probably don't even need this here, but I also changed it in other places
     that <select> was present where we will use it */}

      <article>Bio: {user.bio}</article>
      <Link to={`/profilepage/${user.id}/edit`}>
      <button>Edit Profile</button>
      </Link>

      <div>
        {(user.userType < 5) && (
          <div>
        <h2 className='bannerTop'>
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
