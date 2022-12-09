import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Calendar.css';

// CUSTOM COMPONENTS

function Calendar() {
  

  return (
<>
    <h1>Events Calendar</h1>
    <p>← Month and Year →</p>
    <caption>View:</caption>
    <select>
      
    <option>Year</option>
    <option>Month</option>
    <option>Week</option>
    <option>Day</option>
     
    </select>
<br></br><br></br>
    <caption>Filter By:</caption>

    <select>
      <option disabled selected hidden>Event Type</option>
    <option>Family</option>
    <option>Training</option>
    <option>Youth</option>
    <option>Mentors</option>
     
    </select>
    <br></br><br></br>

    <caption>Location</caption>
    <select>
      <option disabled selected hidden>Location</option>
        <option>St.Cloud</option>
        <option>Twin Cities</option>
      </select>

      <br></br><br></br>

      <caption>My Events</caption>
    <input type="radio"/>

    <div>
      <h1>Map through events and display them in this DIV</h1>
    </div>
    </>
  );
}

export default Calendar;