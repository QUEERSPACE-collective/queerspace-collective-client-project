import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import './EventListItems.css';

import { atcb_action, atcb_init } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import moment from 'moment-timezone';

function EventListItems() {

  const history = useHistory();
  const eventList = useSelector(store => store.event);
  const user = useSelector(store => store.user);


  return (
    <>
      <ul>

        {eventList && eventList.map(event => (
          (user.userType > 1 && (
            <li key = {event.id}>
            {event.name}<br/>
            Date: {moment(event.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}<br/>
            Location: {event.location}<br/>
            <Link to = {`/EventDetails/event/${event.id}`}>
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
          </li>

          ))  
        ))}
         
      </ul>

      <ul>

{eventList && eventList.map(event => (
  ((user.userType == 1 && event.hasVolunteers )&& (
    <li key = {event.id}>
    {event.name}<br/>
    Date: {event.dateTime}<br/>
    Location: {event.location}<br/>
    <Link to = {`/EventDetails/event/${event.id}`}>
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
  </li>

  ))  
))}
 
</ul>

    </>
    
  );
}

export default EventListItems;