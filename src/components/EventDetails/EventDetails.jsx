import { useEffect, useState } from 'react';
import * as React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import './EventDetails.css';
import { atcb_action, atcb_init } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import moment from 'moment-timezone';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EventDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const eventDetails = useSelector(store => store.currentEvent);
  const userEvents = useSelector(store => store.userEventsReducer);
  const eventQuestions = useSelector(store => store.eventQuestions);
  let [attendeeCount, setAttendeeCount] = useState(0);
  let [volunteerCount, setVolunteerCount] = useState(0);

  // handling confirmation modal open and close
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // end confirmation modal

  // handling unregister confirmation modal open and close
  const [unregisterOpen, setUnregisterOpen] = useState(false);
  const handleUnregisterOpen = () => {
    setUnregisterOpen(true);
  };
  const handleUnregisterClose = () => {
    setUnregisterOpen(false)

  }
  // end unregister confirmation

  useEffect(() => {
    pageFadeIn(),
      dispatch({
        type: 'FETCH_EVENT_DETAILS',
        payload: params.id
      })
    dispatch({
      type: 'FETCH_EVENT_QUESTIONS',
      payload: params.id
    }),
      dispatch({ type: 'FETCH_USER_EVENTS' })
  }, [params.id])


  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

  // looking through users registered events, if they are register for an event
  // with the same id as the currently displayed event, set isRegistered to "true"
  // .some() returns a bool
  let isRegistered = userEvents.some(event => event.id === eventDetails?.id);

  // let isEventFull = false;
  // if (eventDetails[0].total_attendees >= eventDetails[0].attendeeMax){
  //   isEventFull = true
  //   console.log('is this event full', isEventFull)
  // } else {
  //   console.log('is this event full', isEventFull)
  // }

  const eventRegistration = () => {
    console.log('in event registration function with id', params.id)
    dispatch({
      type: 'REGISTER_FOR_EVENT',
      payload: { eventId: params.id, attendees: attendeeCount, answer: eventQuestions }
    })
    setOpen(false);
    history.push('/homepage')
  }

  const eventUnregistration = () => {
    dispatch({
      type: 'UNREGISTER_FOR_EVENT',
      payload: params.id
    })
    history.push('/EventCalendar')
  }

  console.log('is this user registered for this event?', isRegistered)
  return (
    <>
      {userEvents.map(allUserEvents => {
        (allUserEvents.id == eventDetails.id) && (
          <>
            {Number(attendeeCount++)}
          </>
        )
      })}
      <h2 className='bannerTop'>EventDetails</h2>
      <div className='event-details-container'>
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
          <h2>
            {eventDetails.name}
          </h2>
          <h4>
            {eventDetails.location}
          </h4>
          <p>
            {eventDetails.description}
          </p>
          <p>
            Max attendees: {eventDetails.attendeeMax}
          </p>
          <p>Registered Attendees: {attendeeCount}  </p>
          <p>Registered Volunteers: {volunteerCount}</p>
        </Box>

        {isRegistered == true ?
          (
            <Button 
              sx={{ mt: 2 }} 
              variant='contained' 
              color='error' 
              onClick={handleUnregisterOpen}>
                Unregister
              </Button>
          )
          :
          (<Button
            color='primary'
            variant="contained"
            sx={{
              mt: 5,
              backgroundColor: '#1793E1',
              '&:hover': {
                backgroundColor: '#30A0BE',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
            onClick={handleClickOpen}
          >
            Register
          </Button>
          )
        }
        {/* add to calendar button */}
        <Button
          variant='contained'
          onClick={e => {
            e.preventDefault();
            let eventDateStart = moment(event.dateTime).format("YYYY-MM-DD");
            let eventDateEnd = moment(event.dateTimeEnd).format("YYYY-MM-DD");
            let eventStartTime = moment(event.dateTime).format("HH:mm");
            let eventEndTime = moment(event.dateTimeEnd).format("HH:mm");

            console.log('event date start', eventDateStart);
            console.log('event date end', eventDateEnd);

            atcb_action({
              name: `${event.name}`,
              startDate: `${eventDateStart}`,
              endDate: `${eventDateEnd}`,
              startTime: `${eventStartTime}`,
              endTime: `${eventEndTime}`,
              location: `${event.location}`,
              options: ['Apple', 'Google', 'Microsoft365', 'Outlook.com', 'Yahoo'],
              timeZone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
              iCalFileName: `${event.name}-QSC-Event`,
            });
          }}>
          add to calendar app
        </Button>
        {/* end add to calendar button */}

        <Link to="/EventCalendar">
          <button>Back to Calendar</button>
        </Link>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`Event Registration: ${eventDetails.name}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Please answer the following questions:
            </DialogContentText>
            <br></br>
            <DialogContentText>
              Including yourself, how many will be attending?
              <input type="number" onChange={(e) => { setAttendeeCount(e.target.value) }} />

              {eventQuestions.map(question => (
                <div key={question.id}>
                  {question.question}
                  <input type="text" onChange={(e) => {
                    dispatch({
                      type: 'STORE_USER_ANSWER',
                      payload: { questionId: question.id, answer: e.target.value }
                    })
                  }
                  } />
                </div>
              ))}

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={eventRegistration}>Register</Button>
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={unregisterOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleUnregisterClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ textAlign: 'center' }}>{"Are you sure you want to unregister?"}</DialogTitle>
          <DialogActions>
            <Button variant="contained" onClick={eventUnregistration}>Unregister</Button>
            <Button variant="contained" onClick={handleUnregisterClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
export default EventDetails;