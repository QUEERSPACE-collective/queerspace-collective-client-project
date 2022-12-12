import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './EventDetails.css';

// CUSTOM COMPONENTS

function EventDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const eventDetails = useSelector(store => store.event)

  useEffect(() => {
    console.log('params is', params)
    dispatch({
      type: 'FETCH_EVENT_DETAILS',
      payload: params.id
    })
  }, [params.id])

  return (
  <>
      <h2>EventDetails</h2>
      <Link to = "/EventList">
        <button>Back to Calendar</button>
      </Link>
      <Link to = "/user">
          <button>Home</button>
      </Link>

      <div className='event-details-container'>
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
        <h2>
          {eventDetails[0].name}
        </h2>

      <h4>
        {eventDetails[0].location}
      </h4>

      <p>
        {eventDetails[0].description}
      </p>
      </Box>

    {/* <a href="https://www.google.com/maps">Maps icon here</a> */}
    {/* I'm guessing we can probably do something like "http://www.google.com/map/{whatever the location data string is}" */}

    
    <Button 
      variant="contained"
      sx = {{mt: 5,
        backgroundColor: '#1793e1',
        '&:hover': {
          backgroundColor: '#30a0be',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>
      Register
    </Button>

    </div>

</>
  );
}

export default EventDetails;