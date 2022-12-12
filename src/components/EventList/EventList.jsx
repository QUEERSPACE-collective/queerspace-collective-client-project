import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import EventListItems from '../EventListItems/EventListItems';
import { Link } from 'react-router-dom';
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
      <Link to = "/user">
        <button>Home</button>
      </Link>
      <h2>Upcoming Events!</h2>
      <EventListItems/>
    </>
    
  );
}
export default EventList;