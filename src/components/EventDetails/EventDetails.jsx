import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './EventDetails.css';

// CUSTOM COMPONENTS

function EventDetails() {
    const history = useHistory();

  return (
<>
    <h1>EventDetails</h1>

    <h1>
    <a href="https://www.google.com/maps">Maps icon here</a>
    {/* I'm guessing we can probably do something like "http://www.google.com/map/{whatever the location data string is}" */}
    </h1>
    <button onClick={() => {history.push('/eventlist')}}>Back to Calendar</button>
    <div>
      
      <button>Register</button>
    </div>
</>
  );
}

export default EventDetails;