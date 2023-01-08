import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllEvents.css';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Fuse from 'fuse.js'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment-timezone';

function AllEvents() {
  const [query, setQuery] = useState(''); // For fuse.js search
  const history = useHistory();
  const dispatch = useDispatch();

  const allEvents = useSelector(store => store.event);
  const [eventType, setEventType] = useState(0);
  const event = useSelector((store) => store.event);

  const fuse = new Fuse(event, {
    keys: [
      'name'
    ],
    includeScore: true
  })
  const results = fuse.search(query);
  console.log('fuse.js results are: ', results);
  console.log('fuse', fuse);
  const eventResults = results.map(result => result.item);

  useEffect(() => {
    pageFadeIn(), 
      dispatch({ type: "FETCH_EVENTS" })
    dispatch({ type: 'FETCH_TOTAL_ATTENDEES' }),
      axios({
        method: 'GET',
        url: '/api/event'
      }).then((response) => {
        setTheUser(response.data);
      }).catch((err) => {
        console.log('Error in getting events',err);
      })
  }, [])

  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

  // Fuse.js search ⬇
  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  const handleDeleteEvent = (eventId) => {
    dispatch({
      type: 'DELETE_EVENT',
      payload: eventId
    })
  }
  const whichOrder = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value, 'is the option value');

    dispatch({
      type: 'CHANGE_EVENT_ORDER',
      payload: evt.target.value
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

  const [confirmationOpen, setConfirmatinoOpen] = React.useState(false);
  const handleConfirmationOpen = (id) => {
    setConfirmatinoOpen(true);
  };
  const handleConfirmationClose = () => {
    setConfirmatinoOpen(false)
  }

  return (
    <>
      <h1>AllEvents</h1>
      <caption>Filter:</caption>

      {/*  */}
      <FormControl className='formControl'>
        <Select
          sx={{ height: '20px', marginTop: '3px', marginRight: '25px', outline: 'none', border: '1px solid black' }}
          id="demo-simple-select"
          value={eventType}
          onChange={(evt) => setEventType(evt.target.value)}
          className='allusersSelect'
        >
          <MenuItem value={0}>All Event Types</MenuItem>
          <MenuItem value={1}>Group Hangout</MenuItem>
          <MenuItem value={2}>Family Event</MenuItem>
          <MenuItem value={3}>Training Event</MenuItem>
          <MenuItem value={4}>Mentor Only</MenuItem>
        </Select>
      </FormControl>
      {/*  */}

      {/* input for fuse.js */}
      <form className='allusersForm'>
        <input
          type="text"
          autoComplete='off'
          id="myInput"
          value={query}
          onChange={handleOnSearch}
          className='searchInput'
          placeholder="Search All"
        >
        </input>
      </form>

      <caption>Sort</caption>
      <select onChange={(evt) => whichOrder(evt)}>
        <option value={1}>Newest</option>
        <option value={2}>Oldest</option>
        <option value={3}>Upcoming</option>
        <option value={4}>Past Events</option>

      </select>

      {/*  */}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Event</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Date and Time</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Event Type</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Attendees</TableCell>
              <TableCell align='right'>Attendee Max</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Program Location</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Edit Event</TableCell>
              {/* <TableCell align="right" sx={{ fontWeight: 'bold' }}>Delete</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>

            {allEvents.map(thisEvent =>
              ((eventType == 0 && results.length <= 0)) && (

                <TableRow key={thisEvent.id}>
                  <TableCell>
                  <Link onClick={() => { history.push(`/AllEvents/attendees/event/${thisEvent.id}`) }}>               
                    {thisEvent.name}
                  </Link>
                  </TableCell>
                  <TableCell align="right">{moment(thisEvent.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right"> {thisEvent.description}</TableCell>
                  <TableCell align="right"> {thisEvent.location}</TableCell>
                  <TableCell align="right"> {thisEvent.type} </TableCell>
                  <TableCell align="right">
                  {thisEvent.totalAttendees}
                  </TableCell>
                  <TableCell align='right'>{thisEvent.attendeeMax}</TableCell>
                  <TableCell align="right">{thisEvent.programLocation} </TableCell>
                  <TableCell align="right">
                    <Link to={`/allevents/${thisEvent.id}/edit`}>
                      <Button
                      sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                      '&:hover': {
                      backgroundColor: '#357590',
                      boxShadow: '6px 6px 0px #90c5bf'
                      },}}>
                    <EditIcon/>
                  </Button>

                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Button
                      variant="contained"
                      color="error"
                      value={thisEvent.id}
                      // onclic, open confirmation 
                      // onClick = {"handleConfirmationOpen; setEventToBeDeleted(evt.target.value)"}
                      
                      // onClick={(evt) => handleDeleteEvent(evt.target.value), }
                      onClick={(evt) => "setEventToBeDeleted(evt.target.value); handleConfirmationOpen"}

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
              ))}

{/* 
            <Dialog
            open={confirmationOpen}
            keepMounted
            onClose={handleConfirmationClose}
            aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle sx = {{textAlign: 'center'}}>{"Are you sure you want to delete this event?"}</DialogTitle>
              <DialogActions>
              <Button variant="contained" 
              onClick={(evt) => handleDeleteEvent(evt.target.value)}
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              >
                Delete
              </Button>
              <Button 
              variant="contained" 
              onClick={handleConfirmationClose}
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog> */}






            {allEvents.map(thisEvent =>
              ((eventType == thisEvent.type && results.length <= 0)) && (

                <TableRow key={thisEvent.id}>
                  <TableCell><Link to={`/allevents/${thisEvent.id}/details`}>
                    {thisEvent.name}
                  </Link>
                  </TableCell>
                  <TableCell align="right">{moment(thisEvent.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right"> {thisEvent.description}</TableCell>
                  <TableCell align="right"> {thisEvent.location}</TableCell>
                  <TableCell align="right"> {thisEvent.type} </TableCell>
                  <TableCell align="right">
                    <Link onClick={() => { history.push(`/AllEvents/attendees/event/${thisEvent.id}`) }}>
                      {thisEvent.totalAttendees}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{thisEvent.attendeeMax}</TableCell>
                  <TableCell align="right">{thisEvent.programLocation} </TableCell>
                  <TableCell align="right">
                    <Link to={`/allevents/${thisEvent.id}/edit`}>
                      <Button variant='contained'><EditIcon/></Button>

                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Button
                      variant="contained"
                      color="error"
                      value={thisEvent.id}
                      onClick={(evt) => handleDeleteEvent(evt.target.value)}
                    >
                      <DeleteIcon/>
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}

            {results.length > 0 && (
              (eventResults.map(allEvents => (
                <TableRow key={allEvents.id}>
                  <TableCell><Link to={`/allevents/${allEvents.id}/details`}>
                    {allEvents.name}
                  </Link>
                  </TableCell>
                  <TableCell align="right">{moment(allEvents.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right"> {allEvents.description}</TableCell>
                  <TableCell align="right"> {allEvents.location}</TableCell>
                  {/* TODO: convert event type from number value to text*/}
                  <TableCell align="right"> {allEvents.type} </TableCell>
                  <TableCell align="right">
                    <Link onClick={() => { history.push(`/AllEvents/attendees/event/${allEvents.id}`) }}>
                      {allEvents.totalAttendees}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{allEvents.attendeeMax}</TableCell>
                  <TableCell align="right">{allEvents.programLocation} </TableCell>
                  <TableCell align="right">
                    <Link to={`/allevents/${allEvents.id}/edit`}>
                      <Button variant='contained'><EditIcon/></Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Button
                      variant="contained"
                      color="error"
                      value={allEvents.id}
                      onClick={(evt) => handleDeleteEvent(evt.target.value)}
                    >
                      <DeleteIcon/>
                    </Button> */}
                  </TableCell>
                </TableRow>
              )))
            )} </TableBody>
        </Table>
      </TableContainer>

        <Button     
          variant='contained' sx = {{bgcolor: '#f39536', fontWeight: 'bold', wordSpacing: 1,                 
          '&:hover': {
          backgroundColor: '#f39536',
          boxShadow: '6px 6px 0px #e2bf05'
          },}}
          onClick = {() => history.push('/neweventform')}
          >
            Add New Event
        </Button>
    </>
  );
}


export default AllEvents;