import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { atcb_action, atcb_init } from 'add-to-calendar-button';
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
            {/* Location: {event.location}<br/> */}
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
    <li key = {event.id}>
    {event.name}<br/>
    Date: {event.dateTime}<br/>
    Location: {event.location}<br/>
    <Link to = {`/EventDetails/event/${event.id}`}>
      <Button 
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