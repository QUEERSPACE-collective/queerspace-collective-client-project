import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import EditIcon from '@mui/icons-material/Edit';
import './HomePage.css';


function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userEvents = useSelector(store => store.userEventsReducer);

  useEffect(() => {
    pageFadeIn(),
      dispatch({
        type: 'FETCH_USER_EVENTS'
      })
  }, [])

  // Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

  return (
    <div className="profilePageContainer">
      <br/>
          <h2>Welcome, {user.fname} {user.lname}!</h2><br/>
            <img src={user.profilePic} style={{ border: '1px solid black', borderRadius: '50%', height: '150px', width: '150px' }} />
            <div className='editProfPicBtn'>
            <Button
            variant='contained'
            sx = {{bgcolor: '#357590', fontWeight: 'bold', 
            wordSpacing: 1, m: 2, color: 'white', 
            width: '40px', height: '20px',              
            '&:hover': {
            backgroundColor: '#357590',
            boxShadow: '6px 6px 0px #90c5bf'
            },}}
            onClick={() => history.push('/ProfilePicture/edit')}
            >
              <EditIcon sx = {{width: '20px', p: 0, m: 0}}/>
            </Button>
            </div>
          <p>pronouns:</p> {user.pronouns}




          {user.userType == 4 && (
            <>
            <p>Mentee:</p>{user.mentor_firstname} {user.mentor_lastname}
            
            </>
          )}
          <>
               <p>Bio:</p>{user.bio} 
          </>
          {user.userType == 3 && (
            <>
          <br/>
            <p>Mentor: </p>{user.mentor_firstname} {user.mentor_lastname}
            </>
          )}
          <br/>
        <Button
          onClick={() => history.push(`/homepage/${user.id}/edit`)}
          variant='contained'
          sx = {{bgcolor: '#357590', fontWeight: 'bold', 
          wordSpacing: 1, m: 2, color: 'white', 
          width: '10px', height: '35px', fontSize:'10px',             
          '&:hover': {
          backgroundColor: '#357590',
          boxShadow: '6px 6px 0px #90c5bf'
          },}}
        >
          Edit Profile
        </Button>
        <br/>
        {(user.userType < 5) && (
          <div>
            <h2 className='bannerTop'>
              Your Upcoming Events...
            </h2>
              {userEvents.map(event => (
                <div className='user-events'
                  key={event.id} onClick={() => { history.push(`/EventDetails/event/${event.id}`) }}>
                 {event.name}  <ArrowCircleRightIcon/>
                </div>
              ))}
          </div>
        )}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
