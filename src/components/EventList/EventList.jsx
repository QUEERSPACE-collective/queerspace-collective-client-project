import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import EventListItems from '../EventListItems/EventListItems';
import './EventList.css';

// CUSTOM COMPONENTS

function EventList() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({
        type: 'FETCH_EVENTS'
    })
}, [])

  return (
    <>
      <h2>EventList</h2>
      <EventListItems/>
    </>
    
  );
}
export default EventList;