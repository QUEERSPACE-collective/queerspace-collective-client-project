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
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
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
  const registrationAnswer = useSelector(store => store.registrationAnswers);
  let [attendeeCount, setAttendeeCount] = useState(0);
  let [volunteerCount, setVolunteerCount] = useState(0);

  const [alertOpen, setAlertOpen] = useState(false);


  // handling confirmation modal 
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // end confirmation modal


  // success message upon registration
  const handleAlertClick = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

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
    animater(),
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
  function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
  }
  //Fade effect

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
    dispatch({
      type: 'REGISTER_FOR_EVENT',
      payload: {eventId: params.id, attendees: attendeeCount, answer: eventQuestions}
    })
    setOpen(false);
    // open snack bar 
    handleAlertClick();
    setTimeout(() => {
      history.push('/home')
    }, 1500); 

  }

  const eventUnregistration = () => {
    dispatch({
      type: 'UNREGISTER_FOR_EVENT',
      payload: params.id
    })
    history.push('/EventList')
  }


  console.log('is this user registered for this event', isRegistered)
  return (
  <>
      <Button 
        onClick={() => history.push('/EventList')} 
        sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590',                
        '&:hover': {
        fontSize: 16
        },}}
        >
        <ArrowCircleLeftIcon/>Back to Calendar
      </Button>

      {userEvents.map(allUserEvents => 
        {(allUserEvents.id == eventDetails.id) && (
        <>
          {Number(attendeeCount++)}
        </>
        )}
      )}
      
      <h2 className='bannerTop'>Details</h2>
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
            {/* Attendees: {eventDetails.length > 0 && eventDetails[0].total_attendees}<br></br> */}
            Max attendees: {eventDetails.attendeeMax}
          </p>
          <p>Registered Attendees: {attendeeCount}  </p>
          <p>Registered Volunteers: {volunteerCount}</p>
        </Box>

          {isRegistered == true ?

            (
              <Button 
              variant='contained' 
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              onClick={handleUnregisterOpen}
              >
                Unregister
              </Button>
            )
            :
            (<Button
              variant="contained"
              sx={{
                mt: 5, fontWeight: 'bold',
                backgroundColor: '#aa87c0',
                '&:hover': {
                  backgroundColor: '#aa87c0',
                  boxShadow: '6px 6px 0px #d069b1'
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
                startTime:`${eventStartTime}`,
                endTime: `${eventEndTime}`,
                location: `${event.location}`,
                options: ['Apple', 'Google', 'Microsoft365', 'Outlook.com', 'Yahoo'],
                timeZone: `${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
                iCalFileName: `${event.name}-QSC-Event`,
              });
            }}
              sx = {{bgcolor: '#f39536', fontWeight: 'bold', wordSpacing: 1, m: 2,                
              '&:hover': {
              backgroundColor: '#f39536',
              boxShadow: '6px 6px 0px #e2bf05'
              },}}>
               add to calendar
               </Button>
            {/* end add to calendar button */}


          {/* {isEventFull == true && 
            <>
              <p>Sorry ,this event is full!</p>
              <Button disabled >
                Register
              </Button>
            </>
            } */}

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
                <input type = "number" onChange={(e)=>{setAttendeeCount(e.target.value)}}/>

              {eventQuestions.map(question => (
                <div key = {question.id}>
                  {question.question}
                  <input type = "text" onChange={(e) => {
                    dispatch({
                      type: 'STORE_USER_ANSWER', 
                      payload: {questionId: question.id, answer: e.target.value}
                    })
                  } 
                  } /> 
              </div>
            
              ))}

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" 
              onClick={eventRegistration}
              sx={{
                mb: 1, fontWeight: 'bold',
                backgroundColor: '#aa87c0',
                '&:hover': {
                  backgroundColor: '#aa87c0',
                  boxShadow: '6px 6px 0px #d069b1'
                },
              }}
              >
                Register
              </Button>
              <Button variant="contained" 
              onClick={handleClose}
              sx={{
                mb: 1, fontWeight: 'bold',
                backgroundColor: '#aa87c0',
                '&:hover': {
                  backgroundColor: '#aa87c0',
                  boxShadow: '6px 6px 0px #d069b1'
                },
              }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={alertOpen} onClose={handleAlertClose}>
              <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                Registration Successful!
              </Alert>
            </Snackbar>
         </Stack>


          <Dialog
            open={unregisterOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleUnregisterClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx = {{textAlign: 'center'}}>{"Are you sure you want to unregister?"}</DialogTitle>
            <DialogActions>
              <Button variant="contained" 
              onClick={eventUnregistration}
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              >
                Unregister
              </Button>
              <Button 
              variant="contained" 
              onClick={handleUnregisterClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
      );
}
export default EventDetails;