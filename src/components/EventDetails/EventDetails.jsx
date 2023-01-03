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
import { TransitionProps } from '@mui/material/transitions';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './EventDetails.css';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// CUSTOM COMPONENTS

// CUSTOM COMPONENTS
function EventDetails() {


  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const eventDetails = useSelector(store => store.event)
  const userEvents = useSelector(store => store.userEventsReducer);
  const eventQuestions = useSelector(store => store.eventQuestions)
  const registrationAnswer = useSelector(store => store.registrationAnswers)
  console.log('the event DETAILS are', eventDetails)
  console.log('user events are', userEvents)




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
    animater(),
    dispatch({
      type: 'FETCH_EVENT_DETAILS',
      payload: params.id
    })
    dispatch({
      type: 'FETCH_EVENT_QUESTIONS',
      payload: params.id
    })
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
  let isRegistered = userEvents.some(event => event.id === eventDetails[0]?.id);
  
  // let isEventFull = false;
  // if (eventDetails[0].total_attendees >= eventDetails[0].attendeeMax){
  //   isEventFull = true
  //   console.log('is this event full', isEventFull)
  // } else {
  //   console.log('is this event full', isEventFull)
  // }

  const eventRegistration = () => {
    console.log('in event registartion function with id', params.id)
    dispatch({
      type: 'REGISTER_FOR_EVENT',
      payload: params.id
    })
    setOpen(false);
    history.push('/home')
  }

  const eventUnregistration = () => {
    dispatch({
      type: 'DELETE_USER_EVENT',
      payload: params.id
    })
    history.push('/EventList')
  }



  console.log('is this user registered for this event', isRegistered)
  return (
  <>

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
            {eventDetails.length > 0 && eventDetails[0].name}
          </h2>
          <h4>
            {eventDetails.length > 0 && eventDetails[0].location}
          </h4>
          <p>
            {eventDetails.length > 0 && eventDetails[0].description}
          </p>
          <p>
            Attendees: {eventDetails.length > 0 && eventDetails[0].total_attendees}<br></br>
            Max attendees: {eventDetails.length > 0 && eventDetails[0].attendeeMax}
          </p>

        </Box>

          {isRegistered == true ?
            (
              <Button sx={{ mt: 2 }} variant='contained' color='error' onClick={handleUnregisterOpen}>Unregister</Button>
            )
            :
            (<Button
              variant="contained"
              sx={{
                mt: 5,
                backgroundColor: '#1793E1',
                '&:hover': {
                  backgroundColor: '#30A0BE',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              onClick={handleClickOpen}>
              Register
            </Button>
            )
          }

      <Link to="/EventList">
        <button>Back to Calendar</button>
      </Link>

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
            <DialogTitle>{"Event Registration"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Please answer the following questions:
              </DialogContentText>
              <DialogContentText>
              {eventQuestions.map(question => (
                <div key = {question.id}>
                  {question.question}
                  <input type = "text" onChange={(e)=>{
                    dispatch({
                      type: 'STORE_USER_ANSWER', 
                      payload: { questionId: question.id, answer: e.target.value }
                    })} 
                  } /> 
                  <button onClick = {()=>{
                    dispatch({
                      type: 'ADD_USER_ANSWER', 
                      payload: registrationAnswer
                    })} 
                  }>save</button>
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
            <DialogTitle sx = {{textAlign: 'center'}}>{"Are you sure you want to unregister?"}</DialogTitle>
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