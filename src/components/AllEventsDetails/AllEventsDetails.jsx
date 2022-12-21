import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import { 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';

function AllEventsDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const event = useSelector((store) => store.event);
    const singleEventsList = useSelector(store => store.eventReducerSpecific); 
    console.log('the single event list: ',singleEventsList); 
    let count = 0;
// This filter is used to loop thru singleEventsList and filter out duplicate Ids
    const uniqueIds = [];
    const uniqueUser = singleEventsList.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);
    if(!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
    }
    return false;
});
    console.log('What the uniqueUser filter returns: ',uniqueUser);
    console.log('the Ids that were found as duplicates: ',uniqueIds);
//
  useEffect(()=> {
    animater(), // call fade effect
        dispatch({
            type: 'FETCH_EVENT_DETAILS',
            payload: params.id
        }),
        dispatch({ type: "FETCH_ALL_USERS" }),
        dispatch({ type: 'FETCH_USER_EVENTS' }),
        dispatch({ 
            type: "FETCH_SPECIFIC_EVENT",
            payload: params.id       
        });       
  },[params.id])
//Fade effect
  function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
  }
//
  const handleDeleteEvent = (eventId) => {
    dispatch({
      type: 'DELETE_EVENT',
      payload: eventId
    })
  };
  
  return (
  <>
       {event.map(employee => 
        <h1>{employee.name}</h1>
       )}
       
    {/* displays all events from database */}
    {/* I just duplicated this code from another componenent, it's probably overkill lol */}

    <TableContainer>
      <Table stickyHeader>     
        <TableBody>
        {event.map(thisEvent =>
          <TableRow key={thisEvent.id}>
            <TableCell>{thisEvent.id}</TableCell>
            <TableCell>{thisEvent.name}</TableCell> 
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
    
     {uniqueUser.map(employee => 
        <>              
            <div key={employee.id} >
                <span style={{display:'none'}}>{count++}</span>
                <p>{employee.fname}</p>
                    {singleEventsList.map(theEvent =>               
                        (theEvent.id == employee.id && (
                            <>
                            <div key={theEvent.id}>
                             <p>{theEvent.question}</p>
                             <p>{theEvent.answer}</p>
                            </div>
                            </>
                        ))
                    )}
                <hr></hr>
            </div> 
        </>             
    )}
    <h1>total attendee count: {count}</h1>
    </>   
    );
  }
// Code explained: singleEventsList is the array of objects which contain all users
// who are registered for the event in question, called from database. Above, 
// uniqueUser is the result of filtering through singleEventsList and finding
// any IDs that are duplicates. uniqueIds gets the values that are unique and those
// unique values get pushed into a new array. uniqueUser is the result of this process.
// Now that our array is limited to unique Ids, we loop through it in the return.
// We increase the {count} for every array index to know how many registered users
// for this event there are. Because we need to search through all of the questions
// and answers for this event, we map through the singleEventsList again, with a 
// different key (theEvent). We add a conditional which compares the theEvent.id,
// (which is just the user id), against the employee id (which is also the user id,
// but for the shortened array). If the user of the singleEventsList array match
// the id of the uniqueUser array id, then we will display the question/answer pair
// for that user, for this event. Since we already filtered out duplicate IDs with 
// uniqueIds and uniqueUser, it will appropriately show the data grouped as we want.

export default AllEventsDetails;