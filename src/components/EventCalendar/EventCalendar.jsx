import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CalendarEventList from '../CalendarEventList/CalendarEventList';
import Box from '@mui/material/Box';
import './EventCalendar.css';

function EventCalendar() {
  const dispatch = useDispatch();
  const eventList = useSelector(store => store.event)
  const user = useSelector(store => store.user)
  console.log('event list', eventList)

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
      <div className='upcoming-events-container'>
        {user.userType !== 1 && (
          <h2>Upcoming Events!</h2>
        )}
        {user.userType == 1 && (
          <h2>Volunteer Events!</h2>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: '#b4b4b43d',
            padding: '20px',
            width: '60%',
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: 2,
          }}>
          <CalendarEventList />
        </Box>
      </div>
    </>
  );
}
export default EventCalendar;