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
  TableRow,
  InputLabel
} from '@mui/material';
import Fuse from 'fuse.js'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment-timezone';
// AllEvents is only accessible via the Admin account.  
function AllEvents() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState(''); // For fuse.js search
  const allEvents = useSelector(store => store.event);
  const [eventType, setEventType] = useState(0); // For filtering
  const event = useSelector((store) => store.event);
  const fuse = new Fuse(event, {
    keys: [
      'name'
    ],
    includeScore: true
  });
  const results = fuse.search(query); // This creates a new array based 
  // off of the text entered in the search bar.
  const eventResults = results.map(result => result.item);
  // eventResults then allows us to map through that array. 
  useEffect(() => {
    pageFadeIn(),
      dispatch({ type: "FETCH_EVENTS" }),
      // Filters the events by the text entered in the search(fuse)
      axios({
        method: 'GET',
        url: '/api/event'
      }).then((response) => {
        setTheUser(response.data);
      }).catch((err) => {
        console.log('Error in getting events', err);
      })
  }, [])

  // Fade effect
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

  const whichOrder = (evt) => {
    evt.preventDefault();
    // Filters the events by a specific order (Goes to event.saga)
    dispatch({
      type: 'CHANGE_EVENT_ORDER',
      payload: evt.target.value
    })
  }

  // THIS CODE BELOW IS NOT YET FUNCTIONAL, BUT WILL BE USED FOR PREVENTING
  // USERS FROM REGISTERING FOR AN EVENT WHEN THE MAX LIMIT IS REACHED.

  // let isEventfull;
  // event.forEach(event => {
  //   if (event.total_attendees == event.attendeeMax){
  //     console.log(event, 'this event is full')
  //   } else {
  //     console.log(event, 'this event is not full')
  //   }
  // })

  return (
    <div className='adminAllEventsContainer'>
      <h1>All Events</h1>
      {/* 1. The onChange in this <FormControl> filters the events 
        by "All, Group, Family, Training, or Mentor" */}
      <FormControl className='formControl'>
        <Select
          sx={{
            width: '200px',
            height: '40px',
            marginTop: '7px',
            marginBottom: '7px',
            marginRight: '25px',
            outline: 'none',
            border: '1px solid black'
          }}
          id="demo-simple-select"
          value={eventType}
          onChange={(evt) => setEventType(evt.target.value)}
          className='allusersSelect'
        >
          <MenuItem value={0}>All Event Types</MenuItem>
          <MenuItem value={"Group Hangout"}>Group Hangout</MenuItem>
          <MenuItem value={"Family Event"}>Family Event</MenuItem>
          <MenuItem value={"Training Event"}>Training Event</MenuItem>
          <MenuItem value={"Mentor Only"}>Mentor Only</MenuItem>
        </Select>
      </FormControl>

      {/* 2. The onChange in this <FormControl> filters the events 
        by "Newest, Oldest, Upcoming, and Past Events" */}
      <FormControl className='formControl'>
        <InputLabel id="sort-event-select-label">Sort By</InputLabel>
        <Select onChange={(evt) => whichOrder(evt)}
          sx={{ width: '200px', height: '40px', marginTop: '7px', marginRight: '25px', outline: 'none', border: '1px solid black' }}
          id="demo-simple-select">
          <MenuItem value={2}>Newest</MenuItem>
          <MenuItem value={1}>Oldest</MenuItem>
          <MenuItem value={3}>Upcoming</MenuItem>
          <MenuItem value={4}>Past Events</MenuItem>
        </Select>
      </FormControl>
      {/* 3. The onChange in this <form> filters the events 
        using fuse.js, comparing the input string in the search
        filter against the list of events  */}
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

      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell alight="right" sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Event</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Date and Time</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Location</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Event Type</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Attendees</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Attendee Max</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Program Location</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic' }}>Edit Event</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allEvents.map(thisEvent =>
              // Map thru all of the events, and while doing so, only return the results
              // if the eventType (from the event type filtering method above) is 0 (default),
              // and only if results.length <= 0 (as long as fuse.js searching 
              // isn't being used. Fuse search overrides other filter methods to search the
              // entire events list)
              ((eventType == 0 && results.length <= 0)) && (
                <TableRow key={thisEvent.id}>
                  <TableCell>
                    {/* Bring us here when the name of the event is clicked on to see more
                      details about the event, as well as the registered users/volunteers.  */}
                    <Link to={`/AllEvents/attendees/event/${thisEvent.id}`} style={{
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: 17,
                      color: '#d069b1'
                    }}>
                      {thisEvent.name} <span>&#8594;</span>
                    </Link>
                  </TableCell>
                  {/* "moment" is used for formatting datetime */}
                  <TableCell align="right" style={{ fontSize: 15 }}>{moment(thisEvent.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15, width: '300px' }}>{thisEvent.location}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}> {thisEvent.eventType} </TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>
                    {thisEvent.totalAttendees}
                  </TableCell>
                  <TableCell align='right' style={{ fontSize: 15 }}>{thisEvent.attendeeMax}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>{thisEvent.locationName} </TableCell>
                  <TableCell align="right">
                    <Link to={`/allevents/${thisEvent.id}/edit`} >
                      <Button
                        sx={{
                          bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',
                          '&:hover': {
                            backgroundColor: '#357590',
                            boxShadow: '6px 6px 0px #90c5bf'
                          },
                        }}>
                        <EditIcon />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                  </TableCell>
                </TableRow>
              ))}

            {allEvents.map(thisEvent =>
              // Same as the mapping above, but here it's saying 'if the 
              // current event's type (specified in filter method "1") 
              // is the same as ANY event found in the events list, 
              // THEN return the following:'
              ((eventType == thisEvent.eventType && results.length <= 0)) && (
                <TableRow key={thisEvent.id}>
                  <TableCell>
                    <Link to={`/AllEvents/attendees/event/${thisEvent.id}`} style={{
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: 17,
                      color: '#d069b1'
                    }} >
                      {thisEvent.name}<span>&#8594;</span>
                    </Link>
                  </TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>{moment(thisEvent.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right">{thisEvent.location}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>{thisEvent.eventType}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>
                    <Link to={`/AllEvents/attendees/event/${thisEvent.id}`} style={{
                      textDecoration: 'none',
                      color: 'black'
                    }}>
                      {thisEvent.totalAttendees}
                    </Link>
                  </TableCell>
                  <TableCell align='right' style={{ fontSize: 15 }}>{thisEvent.attendeeMax}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>{thisEvent.locationName}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>
                    <Link to={`/allevents/${thisEvent.id}/edit`}>
                      <Button
                        sx={{
                          bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',
                          '&:hover': {
                            backgroundColor: '#357590',
                            boxShadow: '6px 6px 0px #90c5bf'
                          },
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                  </TableCell>
                </TableRow>
              ))}
            {results.length > 0 && (
              // If fuse IS being used, then map through the results of
              // the new array it created using eventResults.
              (eventResults.map(fuseResult => (
                <TableRow key={fuseResult.id}>
                  <TableCell>
                    <Link to={`/AllEvents/attendees/event/${allEvents.id}`} style={{
                      textDecoration: 'none', fontWeight: 700,
                      fontSize: 17, color: '#d069b1'
                    }}>
                      {fuseResult.name}<span>&#8594;</span>
                    </Link>
                  </TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>{moment(fuseResult.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15, width: '300px' }}>{fuseResult.location}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>{fuseResult.eventType}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>
                    <Link to={`/AllEvents/attendees/event/${allEvents.id}`} style={{
                      textDecoration: 'none',
                      color: 'black'
                    }}>
                      {fuseResult.totalAttendees}
                    </Link>
                  </TableCell>
                  <TableCell align='right' style={{ fontSize: 15 }}>{fuseResult.attendeeMax}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15, width: '300px' }}>{fuseResult.locationName}</TableCell>
                  <TableCell align="right" style={{ fontSize: 15 }}>
                    <Link to={`/allevents/${allEvents.id}/edit`}>
                      <Button variant='contained'
                        sx={{
                          bgcolor: '#357590',
                          fontWeight: 'bold',
                          wordSpacing: 1,
                          m: 2,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#357590',
                            boxShadow: '6px 6px 0px #90c5bf'
                          },
                        }}>
                        <EditIcon />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      <Button
        variant='contained' sx={{
          bgcolor: '#f39536',
          fontWeight: 'bold',
          wordSpacing: 1,
          '&:hover': {
            backgroundColor: '#f39536',
            boxShadow: '6px 6px 0px #e2bf05'
          },
        }}
        onClick={() => history.push('/neweventform')}
      >
        Add New Event
      </Button>
    </div>
  );
}

export default AllEvents;