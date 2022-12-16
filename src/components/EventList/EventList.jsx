import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import EventListItems from '../EventListItems/EventListItems';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import './EventList.css';

// CUSTOM COMPONENTS

function EventList() {
  const dispatch = useDispatch();
  const eventList = useSelector(store => store.event)
  console.log('event list', eventList)
  
  useEffect(() => {
    dispatch({
        type: 'FETCH_EVENTS'
    })
}, [])

  return (
    <>
      <Link to = "/home">
        <button>Home</button>
      </Link>
      <div className='upcoming-events-container'>
      <h2>Upcoming Events!</h2>
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
        <EventListItems/>
      </Box>
      
      </div>
    </>
  );
}
export default EventList;