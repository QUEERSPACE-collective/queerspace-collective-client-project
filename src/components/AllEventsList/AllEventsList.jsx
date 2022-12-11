import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './AllEventsList.css';
import { 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

// CUSTOM COMPONENTS

function AllEventsList() {
  const dispatch = useDispatch();
  const events = useSelector((store) => store.events);

  useEffect(()=> {
    dispatch({type: "FETCH_ALL_EVENTS"})
  },[])

  return (
<>
    <h1>AllEventsList</h1>
    <caption>Filter:</caption>
    <select>
      <option disabled>Event Type</option>
      {/* TODO we're not using the 1:1 on any calendars, are we? */}
    <option disabled> 1 : 1 hangout</option>
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

    {/* display all events from database */}

    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Date and Time</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Event Type</TableCell>
            <TableCell align="right">Program Location</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {events.map(event =>
        <TableRow key={event.id}>
          <TableCell>{event.name}</TableCell> 
          <TableCell align="right">{event.dateTime}</TableCell>
          <TableCell align="right"> {event.description}</TableCell>
          <TableCell align="right"> {event.location}</TableCell>
          <TableCell align="right"> {event.type} </TableCell>
          <TableCell align="right">{event.programLocation} </TableCell> 
          <TableCell align="right">
            <Button 
              variant="contained"
              color="error"
            > 
              Delete
            </Button>
          </TableCell>
        </TableRow>
)}
        </TableBody>
      </Table>
    </TableContainer>

</>   
  );
}

export default AllEventsList;