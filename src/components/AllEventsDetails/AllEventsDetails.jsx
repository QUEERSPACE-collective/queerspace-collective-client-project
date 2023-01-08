import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

function AllEventsDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const event = useSelector((store) => store.event);
    const currentEvent = useSelector(store => store.currentEvent)
    console.log('current event', currentEvent)
    // const singleEventsList = useSelector(store => store.eventReducerSpecific); 
    // console.log('the single event list: ',singleEventsList); 
    let count = 0;
// This filter is used to loop thru singleEventsList and filter out duplicate Ids
//     const uniqueIds = [];
//     const uniqueUser = singleEventsList.filter(element => {
//     const isDuplicate = uniqueIds.includes(element.id);
//     if(!isDuplicate) {
//         uniqueIds.push(element.id);
//         return true;
//     }
//     return false;
// });
    // console.log('What the uniqueUser filter returns: ',uniqueUser);
    // console.log('the Ids that were found as duplicates: ',uniqueIds);
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
        <h1>{currentEvent.name}</h1>

    <TableContainer>
      <Table stickyHeader>     
        <TableBody>
          <TableRow key={currentEvent.id}>
            <TableCell>{currentEvent.id}</TableCell>
            <TableCell>{currentEvent.name}</TableCell> 
            <TableCell align="right"> {currentEvent.description}</TableCell>
            <TableCell align="right"> {currentEvent.location}</TableCell>
            <TableCell align="right"> {currentEvent.type} </TableCell>
            <TableCell align="right">{currentEvent.programLocation} </TableCell> 
            <TableCell align="right">
              <Link to={`/AllEventsList/${currentEvent.id}/edit`} style = {{textDecoration: 'none'}}>
                <Button
                sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                '&:hover': {
                backgroundColor: '#357590',
                boxShadow: '6px 6px 0px #90c5bf'
                },}}
                >
                 <EditIcon/>
                </Button>
              </Link>
            </TableCell>
            <TableCell align="right">
              {/* <Button 
                value={thisEvent.id}
                onClick={(evt) => handleDeleteEvent(evt.target.value)}
                sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                '&:hover': {
                backgroundColor: '#cf2317',
                boxShadow: '6px 6px 0px #fe6d0e'
                },}}
              > 
                <DeleteIcon/>
              </Button> */}
            </TableCell>
          </TableRow>
        {/* )} */}
        </TableBody>
      </Table>
    </TableContainer>
    
     {/* {uniqueUser.map(employee => 
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
    )} */}
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