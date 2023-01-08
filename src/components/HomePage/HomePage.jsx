import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

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
    <div className="container">
      <h2>Welcome, {user.fname} {user.lname}!</h2>
      <div>
        <img src={user.profilePic} style={{ border: '1px solid black', borderRadius: '50%', height: '200px', width: '200px' }} />
        <Link to='/ProfilePicture/edit' >
          <button>Edit Picture</button>
        </Link>
      </div>
      <p> Name: {user.fname} {user.lname}</p>
      <p> Pronouns: {user.pronouns}</p>
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
      <Link to={`/homepage/${user.id}/edit`}>
        <button>Edit Profile</button>
      </Link>
      <div>
        {(user.userType < 5) && (
          <div>
            <h2 className='bannerTop'>
              Your Upcoming Events...
            </h2>
            <Link to="/EventCalendar">Go to Calendar </Link>
            <div>
              {userEvents.map(event => (
                <div className='user-events'
                  key={event.id} onClick={() => { history.push(`/EventDetails/event/${event.id}`) }}>
                  {event.name}
                </div>
              ))}
            </div>
            <Button variant={'outlined'}>Delete</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
