import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './EventDetails.css';

// CUSTOM COMPONENTS

function EventDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const eventDetails = useSelector(store => store.event)
  console.log('event details are!!!!!!!!!!', eventDetails)

  useEffect(() => {
    console.log('params is', params)
    dispatch({
      type: 'FETCH_EVENT_DETAILS',
      payload: params.id
    })
  }, [params.id])

  return (
<>
    <h2>EventDetails</h2>
    <Link to = "/EventList">
      <button>Back to Calendar</button>
    </Link>
  
    <p>
      {eventDetails[0].name}
    </p>

    <p>
      {eventDetails[0].location}
    </p>

    <p>
      {eventDetails[0].description}
    </p>
      





    <h1>
    {/* <a href="https://www.google.com/maps">Maps icon here</a> */}
    {/* I'm guessing we can probably do something like "http://www.google.com/map/{whatever the location data string is}" */}
    </h1>

      <button>Register</button>

</>
  );
}

export default EventDetails;