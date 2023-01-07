import React from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
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
      <img src={user.profilePic} style={{border:'1px solid black',borderRadius:'50%', height:'200px', width:'200px'}}/>
      <Button
        onClick={() => history.push('/ProfilePicture/edit')}
        variant='contained'
        size = "small"
        sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
        '&:hover': {
        backgroundColor: '#357590',
        boxShadow: '6px 6px 0px #90c5bf'
        },}}
      >
        Picture<EditIcon/>
      </Button>
      </div>
      <p> Name: {user.fname} {user.lname}</p>
      <p> Pronouns: {user.pronouns}</p>
      {/* <p> Email: {user.username}</p> */}
      <form>
      <label>
          Your access level is:
        </label>
        < >
          {user.userType == 1 && (
            <p>Volunteer</p>
          )}
          {user.userType == 2 && (
            <p>Caregiver</p>
          )}
          {user.userType == 3 && (
            <p>Mentee/Youth</p>
          )}
          {user.userType == 4 && (
            <p>Mentor</p>
          )}
          {user.userType == 5 && (
            <p>Admin</p>
          )}
        </>
      </form>
      
      {user.userType == 3 && (
        <p>Mentor: {user.mentor_firstname} {user.mentor_lastname}</p>
      )}

      {user.userType == 4 && (
        <p>Mentee: {user.mentor_firstname} {user.mentor_lastname}</p>
      )}

      <article>Bio: {user.bio}</article>
      <Button
        onClick={() => history.push(`/home/${user.id}/edit`)}
        variant='contained'
        size = "small"
        sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
        '&:hover': {
        backgroundColor: '#357590',
        boxShadow: '6px 6px 0px #90c5bf'
        },}}
        >
          Profile<EditIcon/>
      </Button>
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
            key = {event.id} onClick = {() => {history.push(`/EventDetails/event/${event.id}`)}}>
              {event.name}
            </div>
          ))}
        </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
