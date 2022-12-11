import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './EventListItems.css';


// CUSTOM COMPONENTS

function EventListItems() {
  const eventList = useSelector(store => store.event)

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
            <button>Details</button>
            <br/>
            <br/>
          </li>
        ))}

      </ul>

    </>
    
  );
}

export default EventListItems;