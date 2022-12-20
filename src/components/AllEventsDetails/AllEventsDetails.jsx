import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

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

function AllEventsDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const event = useSelector((store) => store.event);
  const user = useSelector((store) => store.user);
  const allUsersList = useSelector(store => store.allUsers);
  const eventDetails = useSelector(store => store.event)
  const userEvents = useSelector(store => store.userEventsReducer);
  const eventList = useSelector(store => store.event)
    const singleEventsList = useSelector(store => store.eventReducerSpecific); 
    console.log('what is yo',singleEventsList);
//
const uniqueIds = [];
const uniqueEmployees = singleEventsList.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);
    if(!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
    }
    return false;
});
console.log(uniqueEmployees, 'what it be??');
console.log(uniqueIds,'what it eeeeez');
//
  const eventType = params.id;

  useEffect(()=> {
    animater(), //fade effect call
    dispatch({
        type: 'FETCH_EVENT_DETAILS',
        payload: params.id
      }),
      dispatch({ type: "FETCH_ALL_USERS" }),
       dispatch({
          type: 'FETCH_USER_EVENTS'
        })
        ,
        dispatch({ 
            type: "FETCH_SPECIFIC_EVENT",
            payload: params.id       
        })
        ;
        
  },[params.id])
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
    <h1>SPECIFIC EVENT</h1>

    {/* display all events from database */}

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


            {/* {singleEventsList.map(theEvent => 
                <>
                
                <div key={theEvent.id}>
                    <p>{theEvent.name}</p>
                    <p>{theEvent.fname}</p>
                    
                    {singleEventsList.map(innerList => 
                        
                        (innerList.id == theEvent.id && (
                            <>
                            <div key={innerList.id}>
                             <p>{innerList.question}</p>
                             <p>{innerList.answer}</p>
                             </div>
                             </>
                        ))
                    )}
                    <hr></hr>
                </div> 
                </>             
                )} */}
                {uniqueEmployees.map(employee => 
                <>              
                <div key={employee.id}>
                    <p>{employee.name}</p>
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
    </>   
    );
  }


export default AllEventsDetails;