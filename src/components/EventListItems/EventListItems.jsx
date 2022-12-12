import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './EventListItems.css';


// CUSTOM COMPONENTS

function EventListItems() {
  const history = useHistory()
  const eventList = useSelector(store => store.event)

  const eventDetails = (id) => {
    console.log('in event details function with event id:', id)
    history.push('/EventDetails/')
  }

  return (
    <>
          <ul>
        {eventList.map(event => (
          <li key = {event.id}>
            {event.name}<br/>
            Date: {event.dateTime}<br/>
            Location: {event.location}<br/>
            Type: {event.type}<br/>
            Description: {event.description}<br/>
            <button onClick = {() => eventDetails(event.id)}>Details</button>
            <br/>
            <br/>
          </li>
        ))}

      </ul>

    </>
    
  );
}

export default EventListItems;