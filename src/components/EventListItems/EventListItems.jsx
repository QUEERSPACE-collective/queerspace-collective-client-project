import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
          <li key = {event.id}>
            {event.name}<br/>
            Date: {event.dateTime}<br/>
            Location: {event.location}<br/>
            {/* Type: {event.type}<br/> */}
            {/* Description: {event.description}<br/> */}
            <Link to = {`/EventDetails/${event.id}`}>
              <button>Details</button>
            </Link>
            <br/>
            <br/>
          </li>
        ))}

      </ul>

    </>
    
  );
}

export default EventListItems;