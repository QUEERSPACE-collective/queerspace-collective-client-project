import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import EventListItems from '../EventListItems/EventListItems';
import Box from '@mui/material/Box';
import './EventCalendar.css';

function EventCalendar() {
  const dispatch = useDispatch();
  const eventList = useSelector(store => store.event)
  const user = useSelector(store => store.user)

  // Get all events on page load
  useEffect(() => {
    pageFadeIn(),
      dispatch({
        type: 'FETCH_EVENTS'
      })
  }, [])

  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

  return (
    <>
    <br/>
      <div className='upcoming-events-container'>
        {/* if current user isn't a volunteer, show this */}
        {user.userType !== 1 && (
          <h2>Upcoming Events!</h2>
        )}
        {/* if current user is a volunteer, show this */}
        {user.userType == 1 && (
          <h2>Volunteer Events!</h2>
        )}
        <br/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f8f9',
            padding: '20px',
            width: '60%',
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <EventListItems />
        </Box>
      </div>
    </>
  );
}
export default EventCalendar;