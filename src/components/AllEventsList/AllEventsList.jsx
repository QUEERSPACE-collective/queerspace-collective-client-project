import React, { useEffect } from 'react';
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
  TableRow
} from '@mui/material';

// CUSTOM COMPONENTS

function AllEventsList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);
  console.log('the events are', event)

  useEffect(()=> {
    animater(), //fade effect call
    dispatch({type: "FETCH_EVENTS"})
    dispatch({type: 'FETCH_TOTAL_ATTENDEES'})
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


  // let isEventfull;
  // event.forEach(event => {
  //   if (event.total_attendees == event.attendeeMax){
  //     console.log(event, 'this event is full')
  //   } else {
  //     console.log(event, 'this event is not full')
  //   }
  // })
  
  return (
  <>
    <h1>AllEventsList</h1>
    <caption>Filter:</caption>
    <select>
      <optgroup label='Event Type'>
      {/* TODO: connect filters to data and add search capability */}
        <option value={1}>Group Hangout</option>
        <option value={2}>Family Event</option>
        <option value={3}>Training Event</option>
        <option value={4}>Mentor Only</option>
    </optgroup>
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
            {/* <TableCell align="right" sx={{fontWeight: 'bold'}}>Program Location</TableCell> */}
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Event Type</TableCell>
            <TableCell align="right" sx = {{fontWeight: 'bold'}}>Attendees</TableCell>
            <TableCell align='right'>Attendee Max</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Program Location</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Edit Event</TableCell>
            <TableCell align="right" sx={{fontWeight: 'bold'}}>Delete</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
 
        {event.map(thisEvent =>
          <TableRow key={thisEvent.id}>
            <TableCell><Link to={`/alleventslist/${thisEvent.id}/details`}>
            {thisEvent.name}
              </Link>
            </TableCell> 
            <TableCell align="right">{thisEvent.dateTime}</TableCell>
            <TableCell align="right"> {thisEvent.description}</TableCell>
            <TableCell align="right"> {thisEvent.location}</TableCell>
            {/* TODO: convert event type from number value to text*/}
            <TableCell align="right"> {thisEvent.type} </TableCell>
            <TableCell align="right">
              <Link onClick = {() => {history.push(`/AllEventsList/attendees/event/${thisEvent.id}`)}}>
                {thisEvent.totalAttendees}
              </Link>
            </TableCell>
            <TableCell align='right'>{thisEvent.attendeeMax}</TableCell>
            <TableCell align="right">{thisEvent.programLocation} </TableCell> 
            <TableCell align="right">
              <Link to={`/alleventslist/${thisEvent.id}/edit`}>
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
        
  
          <Link to = "/neweventform"><Button variant = 'contained'>Add New Event</Button></Link>
  </>   
    );
  }


export default AllEventsList;