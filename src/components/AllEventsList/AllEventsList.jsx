import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './AllEventsList.css';
import { 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

// CUSTOM COMPONENTS

function AllEventsList() {
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);

  useEffect(()=> {
    animater(), //fade effect call
    dispatch({type: "FETCH_EVENTS"})
  },[])
//Fade effect
  function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
  }
//Fade effect
  const handleDeleteEvent = (eventId) => {
    dispatch({
      type: 'DELETE_EVENT',
      payload: eventId
    })
  }
  
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
            <TableCell sx={{fontWeight: 'bold'}}>Event</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Date and Time</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Description</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Location</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Event Type</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Program Location</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Edit Event</TableCell>

            <TableCell align="right" sx={{fontWeight: 'bold'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {event.map(thisEvent =>
          <TableRow key={thisEvent.id}>
            <TableCell>{thisEvent.name}</TableCell> 
            <TableCell align="right">{thisEvent.dateTime}</TableCell>
            <TableCell align="right"> {thisEvent.description}</TableCell>
            <TableCell align="right"> {thisEvent.location}</TableCell>
            <TableCell align="right"> {thisEvent.type} </TableCell>
            <TableCell align="right">{thisEvent.programLocation} </TableCell> 
            <TableCell align="right">
              <Link to={`/AllEventsList/${thisEvent.id}/edit`}>
                <Button>Edit Event</Button>
              </Link>
            </TableCell>
            <TableCell align="right">
              <Button 
                variant="contained"
                color="error"
                value={thisEvent.id}
                onClick={(evt) => handleDeleteEvent(evt.target.value)}
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