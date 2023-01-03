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
  const history = useHistory()
  const eventList = useSelector(store => store.event)

  return (
    <>
      <ul>
        {eventList && eventList.map(event => (
          <div key = {event.id}>
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
            {/* add to calendar button */}
            <Button 
            onClick={e => {
              e.preventDefault();
              let eventDateStart = moment(event.dateTime).format("YYYY-MM-DD");
              let eventDateEnd = moment(event.dateTimeEnd).format("YYYY-MM-DD");
              let eventStartTime = moment(event.dateTime).format("HH:mm");
              let eventEndTime = moment(event.dateTimeEnd).format("HH:mm");

              console.log('event date start', eventDateStart);
              console.log('event date end', eventDateEnd);
            
              atcb_action({
                name: `${event.name}`,
                startDate: `${eventDateStart}`,
                endDate: `${eventDateEnd}`,
                startTime:`${eventStartTime}`,
                endTime: `${eventEndTime}`,
                location: `${event.location}`,
                options: ['Apple', 'Google', 'Microsoft365', 'Outlook.com', 'Yahoo'],
                timeZone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
                iCalFileName: `${event.name}-QSC-Event`,
              });
            }}>
               add to cal
            </Button>

            <br/>
            <br/>
          </div>
        ))}
      </ul>

    </>
    
  );
}

export default EventListItems;