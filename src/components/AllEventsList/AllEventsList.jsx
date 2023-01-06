import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Fuse from 'fuse.js'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function AllEventsList() {
  const [query, setQuery] = useState(''); // For fuse.js search
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [theEvent, setTheEvent] = useState([]); // For fuse.js search

  const allEventsList = useSelector(store => store.event);
  const [eventType, setEventType] = useState(0);

  const event = useSelector((store) => store.event);

  const fuse = new Fuse(event, {
    keys: [
      'name'
    ],
    includeScore: true
  })
  const results = fuse.search(query);
  console.log(results, 'results are');
  console.log('fuse', fuse);
  const eventResults = results.map(result => result.item);

  useEffect(() => {
    animater(), //fade effect call
      dispatch({ type: "FETCH_EVENTS" })
    dispatch({ type: 'FETCH_TOTAL_ATTENDEES' }),
      axios({
        method: 'GET',
        url: '/api/events'
      }).then((response) => {
        setTheUser(response.data);
      }).catch((err) => {
        console.log('Error in getting events');
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
  // Fuse.js search ⬇️
  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }
  // Fuse.js search ⬆️
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

  return (
    <>
      <h1>AllEventsList</h1>
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
              {/* <TableCell align="right" sx={{fontWeight: 'bold'}}>Program Location</TableCell> */}
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Event Type</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Attendees</TableCell>
              <TableCell align='right'>Attendee Max</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Program Location</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Edit Event</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {allEventsList.map(thisEvent =>
              ((eventType == 0 && results.length <= 0)) && (

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
                    <Link onClick={() => { history.push(`/AllEventsList/attendees/event/${thisEvent.id}`) }}>
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
              ))}

            {allEventsList.map(thisEvent =>
              ((eventType == thisEvent.type && results.length <= 0)) && (

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
                    <Link onClick={() => { history.push(`/AllEventsList/attendees/event/${thisEvent.id}`) }}>
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
              ))}

            {results.length > 0 && (
              (eventResults.map(allEvents => (
                <TableRow key={allEvents.id}>
                  <TableCell><Link to={`/alleventslist/${allEvents.id}/details`}>
                    {allEvents.name}
                  </Link>
                  </TableCell>
                  <TableCell align="right">{allEvents.dateTime}</TableCell>
                  <TableCell align="right"> {allEvents.description}</TableCell>
                  <TableCell align="right"> {allEvents.location}</TableCell>
                  {/* TODO: convert event type from number value to text*/}
                  <TableCell align="right"> {allEvents.type} </TableCell>
                  <TableCell align="right">
                    <Link onClick={() => { history.push(`/AllEventsList/attendees/event/${allEvents.id}`) }}>
                      {allEvents.totalAttendees}
                    </Link>
                  </TableCell>
                  <TableCell align='right'>{allEvents.attendeeMax}</TableCell>
                  <TableCell align="right">{allEvents.programLocation} </TableCell>
                  <TableCell align="right">
                    <Link to={`/alleventslist/${allEvents.id}/edit`}>
                      <Button>Edit Event</Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      value={allEvents.id}
                      onClick={(evt) => handleDeleteEvent(evt.target.value)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )))
            )} </TableBody>
        </Table>
      </TableContainer>

      <Link to="/neweventform"><Button variant='contained'>Add New Event</Button></Link>
    </>
  );
}


export default AllEventsList;