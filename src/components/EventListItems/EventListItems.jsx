import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import 'add-to-calendar-button/assets/css/atcb.css';
import moment from 'moment-timezone';
import './EventListItems.css';


function EventListItems() {

  const history = useHistory();
  const eventList = useSelector(store => store.event);
  const user = useSelector(store => store.user);


  return (
    <>
      <ul>
        {eventList && eventList.map(event => (
          (user.userType > 1 && (
            <div key = {event.id} className="eventListItem">
            <h4>{event.name}</h4>
            {moment(event.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}<br/>
              <Button 
                onClick={() => history.push(`/EventDetails/event/${event.id}`)}
                sx={{
                mt: 2, fontWeight: 'bold', color: 'white', letterSpacing: 1,
                backgroundColor: '#aa87c0', 
                '&:hover': {
                  backgroundColor: '#aa87c0',
                  boxShadow: '6px 6px 0px #d069b1'
                },
              }}
                >
                  Details
              </Button>
            <br/>
            <br/>
          </div>
          ))  
        ))}
         
      </ul>

      <ul>
      {eventList && eventList.map(event => (
        ((user.userType == 1 && event.hasVolunteers )&& (
          <div key = {event.id}>
          <h4>{event.name}</h4><br/>
          {event.dateTime}<br/>
            <Button 
              onClick={() => history.push(`/EventDetails/event/${event.id}`)}
              sx={{
                mt: 2, fontWeight: 'bold', color: 'white', letterSpacing: 1,
                backgroundColor: '#aa87c0',
                '&:hover': {
                  backgroundColor: '#aa87c0',
                  boxShadow: '6px 6px 0px #d069b1'
                },
              }}
              >
                Details
            </Button>
          <br/>
          <br/>
        </div>
        ))  
      ))}  
      </ul>
    </> 
  );
}

export default EventListItems;