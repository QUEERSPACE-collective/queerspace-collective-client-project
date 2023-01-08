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

export default AllEventsDetails;