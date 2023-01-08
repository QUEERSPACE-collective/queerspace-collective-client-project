import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EventListItems from '../EventListItems/EventListItems';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';


function EventList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const eventList = useSelector(store => store.event)
  const user = useSelector(store => store.user)
  console.log('event list', eventList)
  
  useEffect(() => {
    animater(),
    dispatch({
        type: 'FETCH_EVENTS'
    })
}, [])

//Fade effect
function animater() {
  document.body.classList.remove("noSalmon");
  document.body.classList.add("salmon");
  setTimeout(() => document.body.classList.remove("salmon"), 100);
  setTimeout(() => document.body.classList.add("noSalmon"), 100);
}
//Fade effect

  return (
    <>
    <br/>

      <div className='upcoming-events-container'>
      <Button 
        onClick={() => history.push('/homepage')} 
        sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590',                
        '&:hover': {
        fontSize: 16
        },}}
        >
        <ArrowCircleLeftIcon/> home
      </Button>
        {user.userType !== 1 && (
           <h2>Upcoming Events</h2>
        )}
        {user.userType == 1  && (
           <h2>Volunteer Events</h2>
        )}
        <br/>
      <Box        
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#b4b4b43d',
        padding: '20px', 
        width: '60%',
        textAlign: 'center',
        borderRadius: 3,
        boxShadow: 2,
      }}>
        <EventListItems/>
      </Box>
      
      </div>
    </>
  );
}
export default EventList;