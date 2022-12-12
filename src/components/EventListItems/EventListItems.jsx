import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import './EventListItems.css';


// CUSTOM COMPONENTS

function EventListItems() {
  const history = useHistory()
  const eventList = useSelector(store => store.event)

  // const eventDetails = (id) => {
  //   console.log('in event details function with event id:', id)
  //   history.push('/EventDetails/')
  // }

  return (
    <>
          <ul>
        {eventList.map(event => (
          <div key = {event.id}>
            {event.name}<br/>
            Date: {event.dateTime}<br/>
            Location: {event.location}<br/>
            {/* Type: {event.type}<br/> */}
            {/* Description: {event.description}<br/> */}
            <Link to = {`/EventDetails/${event.id}`}>
            <Button 
              variant="contained"
              sx = {{mt: 5,
              backgroundColor: '#1793e1',
                '&:hover': {
                  backgroundColor: '#30a0be',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}>
                Details
            </Button>
            </Link>
            <br/>
            <br/>
          </div>
        ))}
      </ul>

    </>
    
  );
}

export default EventListItems;