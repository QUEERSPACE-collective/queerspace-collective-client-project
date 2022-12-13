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

function EventDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const eventDetails = useSelector(store => store.event)

  // handling confirmation modal open and close
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //handling alert confirmation 
  // not functional right now
  const [alertOpen, setAlertOpen] = useState({alertOpen: false, vertical: 'top', horizontal: 'center'});

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  // end alert confirmation


  useEffect(() => {
    console.log('params is', params)
    dispatch({
      type: 'FETCH_EVENT_DETAILS',
      payload: params.id
    })
  }, [params.id])
  


  const eventRegistration  = () => {
    console.log('in event registartion function with id', params.id)
    dispatch({
      type: 'REGISTER_FOR_EVENT',
      payload: params.id
    })
    setOpen(false);
    setAlertOpen(true)
  }



  return (
  <>
      <h2>EventDetails</h2>
      <Link to = "/EventList">
        <button>Back to Calendar</button>
      </Link>
      <Link to = "/user">
          <button>Home</button>
      </Link>

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
          {eventDetails[0].name}
        </h2>

      <h4>
        {eventDetails[0].location}
      </h4>

      <p>
        {eventDetails[0].description}
      </p>
      </Box>

    {/* <a href="https://www.google.com/maps">Maps icon here</a> */}
    {/* I'm guessing we can probably do something like "http://www.google.com/map/{whatever the location data string is}" */}

    
    <Button 
      variant="contained"
      sx = {{mt: 5,
        backgroundColor: '#1793e1',
        '&:hover': {
          backgroundColor: '#30a0be',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      onClick = {handleClickOpen}>
      Register
    </Button>
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
        </DialogContent>
        <DialogActions>
          <Button variant = "contained" onClick={eventRegistration}>Register</Button>
          <Button variant = "contained" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>




      {/* <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack> */}
    </div>

</>
  );
}

export default EventDetails;