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
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment-timezone';

function AllEvents() {
  const [query, setQuery] = useState(''); // For fuse.js search
  const history = useHistory();
  const dispatch = useDispatch();

  const allEvents = useSelector(store => store.event);
  const [eventType, setEventType] = useState(0);
  const event = useSelector((store) => store.event);
  console.log('all events are', allEvents);
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
        console.log('Error in getting events', err);
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
    <div className='adminAllEventsContainer'>
      <h1>All Events</h1>
      <p>Filter:</p>

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
      
      <p>Sort</p>
      <FormControl className='formControl'>
        <Select onChange={(evt) => whichOrder(evt)}
          sx={{ height: '20px', marginTop: '3px', marginRight: '25px', outline: 'none', border: '1px solid black' }}
          id="demo-simple-select">
          <MenuItem value={2}>Newest</MenuItem>
          <MenuItem value={1}>Oldest</MenuItem>
          <MenuItem value={3}>Upcoming</MenuItem>
          <MenuItem value={4}>Past Events</MenuItem>
        </Select>
      </FormControl>
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
      <TableContainer >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell alight="right"sx={{ fontWeight: 'bold', fontSize: '19px', fontStyle: 'italic'}}>Event</TableCell>
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
              ((eventType == 0 && results.length <= 0)) && (

                <TableRow key={thisEvent.id} >
                  <TableCell>
                    <Link to={`/AllEvents/attendees/event/${thisEvent.id}`} style = {{textDecoration: 'none', fontWeight: 700,
                     fontSize: 17, color: '#d069b1'}}>
                      {thisEvent.name} <span>&#8594;</span>
                    </Link>
                  </TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>{moment(thisEvent.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right"  style = {{fontSize: 15, width: '300px'}}>{thisEvent.location}</TableCell>
                  <TableCell align="right"  style = {{fontSize: 15}}> {thisEvent.eventType} </TableCell>
                  <TableCell align="right"  style = {{fontSize: 15}}>
                    {thisEvent.totalAttendees}
                  </TableCell>
                  <TableCell align='right' style = {{fontSize: 15}}>{thisEvent.attendeeMax}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>{thisEvent.locationName} </TableCell>
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
              ((eventType == thisEvent.type && results.length <= 0)) && (

                <TableRow key={thisEvent.id}>
                  <TableCell>
                    <Link to={`/AllEvents/attendees/event/${thisEvent.id}`}style = {{textDecoration: 'none', fontWeight: 700,
                     fontSize: 17, color: '#d069b1'}} >
                      {thisEvent.name}<span>&#8594;</span>
                    </Link>
                  </TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>{moment(thisEvent.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right">{thisEvent.location}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>{thisEvent.type}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>
                    <Link to={`/AllEvents/attendees/event/${thisEvent.id}`} style = {{textDecoration: 'none', 
                      color: 'black'}}>
                      {thisEvent.totalAttendees}
                    </Link>
                  </TableCell>
                  <TableCell align='right' style = {{fontSize: 15}}>{thisEvent.attendeeMax}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>{thisEvent.programLocation}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>
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
              (eventResults.map(allEvents => (
                <TableRow key={allEvents.id}>
                  <TableCell>
                    <Link to={`/AllEvents/attendees/event/${allEvents.id}`} style = {{textDecoration: 'none', fontWeight: 700,
                     fontSize: 17, color: '#d069b1'}}>
                      {allEvents.name}<span>&#8594;</span>
                    </Link>
                  </TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>{moment(allEvents.dateTime).format("dddd, MMMM Do YYYY, h:mm:ss A")}</TableCell>
                  <TableCell align="right"style = {{fontSize: 15, width: '300px'}}>{allEvents.location}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>{allEvents.type}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>
                    <Link to={`/AllEvents/attendees/event/${allEvents.id}`} style = {{textDecoration: 'none', 
                      color: 'black'}}>
                      {allEvents.totalAttendees}
                    </Link>
                  </TableCell>
                  <TableCell align='right' style = {{fontSize: 15}}>{allEvents.attendeeMax}</TableCell>
                  <TableCell align="right"style = {{fontSize: 15, width: '300px'}}>{allEvents.programLocation}</TableCell>
                  <TableCell align="right" style = {{fontSize: 15}}>
                    <Link to={`/allevents/${allEvents.id}/edit`}>
                      <Button variant='contained'
                        sx={{
                          bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',
                          '&:hover': {
                            backgroundColor: '#357590',
                            boxShadow: '6px 6px 0px #90c5bf'
                          },
                        }}>
                          <EditIcon/>
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
          bgcolor: '#f39536', fontWeight: 'bold', wordSpacing: 1,
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