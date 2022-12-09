import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AllEventsList.css';

// CUSTOM COMPONENTS

function AllEventsList() {
  

  return (
<>
    <h1>AllEventsList</h1>
    <caption>Filter:</caption>
    <select>
      <option disabled>Event Type</option>
    <option>1 : 1 hangout</option>
    <option>Training</option>
    <option>Family</option>
    <option>Youth Only</option>
     
    </select>

    <input type='text' placeholder='Search'/>

    <caption>Sort</caption>
    <select>
        <option>Newest</option>
        <option>Oldest</option>
        <option>Upcoming</option>

      </select>
    
</>   
  );
}

export default AllEventsList;