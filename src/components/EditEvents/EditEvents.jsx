import * as React from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, OutlinedInput, Typography, Box, Card } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment-timezone';
import './EditEvents.css';


function EditEvents(){
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    // on page load runs....
    useEffect(() => {
        pageFadeIn(),
        dispatch({
            type: "FETCH_EDIT_EVENT",
            payload: params.id
        });

        return () => {
            dispatch({
                type: "CLEAR_EDIT_EVENT"
            })
        }
    }, [params.id]);

    // delete event function
    const handleDeleteEvent = (id) => {
        dispatch({
          type: 'DELETE_EVENT',
          payload: id
        })
        setTimeout(() => {
            history.push('/allevents')
          }, 1500); 
      };

    // asks to confirm upon certain events/button clicks
    const [confirmationOpen, setConfirmationOpen] = React.useState(false);
    const handleConfirmationOpen = () => {
      setConfirmationOpen(true);
    };
    const handleConfirmationClose = () => {
      setConfirmationOpen(false)
    }

    //Fade effect
    function pageFadeIn() {
        document.body.classList.remove("withOpacity");
        document.body.classList.add("noOpacity");
        setTimeout(() => document.body.classList.remove("noOpacity"), 100);
        setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

    const editEvent = useSelector(store => store.editEvent);
    console.log(editEvent);

    // form submit function
    const onSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_EVENT",
            payload: editEvent
        }),
        dispatch({
            type: 'FETCH_EVENTS'
        });
        history.push('/AllEvents')
    }

    return(
    <div className='admintEditEventContainer'>
        
        <div className='adminEditEventHeader'>
        {/* back button, directs to all events */}
            <Button
                className='backToEventsBtn'
                onClick={() => history.push('/allevents')}
                sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', m: 3,                
                '&:hover': {
                fontSize: 16
                },}}
                >
                <ArrowCircleLeftIcon/>Back To Events List
            </Button>
            <h2 className='bannerTop'>Edit Event</h2>
        </div>

        {/* event edit form */}
        <form onSubmit={onSubmit}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m:1,
                    p:2
                }}
            >
            {/* edit event name */}
            <label>
                Event Name:
            </label>
            <OutlinedInput
                label= "Event Name:"
                value={editEvent && editEvent.name}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_EVENT',
                    payload: {name: evt.target.value}
                })}
            />
            {/* end edit event name */}
            {/* edit event date time */}
            <label>
                Start Date and Time:
            </label>
            
            <OutlinedInput
                type="datetime-local"
                value={editEvent && moment(editEvent.dateTime).format("YYYY-MM-DD HH:mm")}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_EVENT',
                    payload: {dateTime: new Date(evt.target.value)}
                })}
            />
            <label>
                End Date and Time:
            </label>

            <OutlinedInput
                type="datetime-local"
                value={editEvent && moment(editEvent.dateTimeEnd).format("YYYY-MM-DD HH:mm")}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_EVENT',
                    payload: {dateTimeEnd: new Date(evt.target.value)}
                })}
            />

            <label>
                Edit Description:
            </label>
            
            <OutlinedInput
                multiline
                value={editEvent && editEvent.description}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_EVENT',
                    payload: {description: evt.target.value}
                })}
            />

            <label>
                Edit Location:
            </label>
            <OutlinedInput
                value={editEvent && editEvent.location}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_EVENT',
                    payload: {location: evt.target.value}
                })}/>

            <label>
                Edit Type:
            </label>
            <OutlinedInput
                value={editEvent && editEvent.type}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_EVENT',
                    payload: {type: evt.target.value}
                })}/>

            <label>
                Edit Program Location:
            </label>
            <OutlinedInput
                value={editEvent && editEvent.programLocationID}
                onChange={(evt) => dispatch({
                    type: 'UPDATE_EDIT_EVENT',
                    payload: {programLocationID: evt.target.value}
                })}/>
            </Card> 

            <Button 
                type="submit"
                sx = {{bgcolor: '#46a452e6', fontWeight: 'bold', letterSpacing: 1.5, m: 2, color: 'white',               
                '&:hover': {
                backgroundColor: '#46a452e6',
                boxShadow: '6px 6px 0px #82bc27e0'
                },}}
            >Submit</Button>
        </form>
                    
        {/* delete button */}
        <Button 
            sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
            '&:hover': {
            backgroundColor: '#cf2317',
            boxShadow: '6px 6px 0px #fe6d0e'
            },}}
            variant="contained"
            onClick = {handleConfirmationOpen}
            >
                Delete Event
        </Button>

        {/* confirmation alert dialog when delete is pushed */}
        <Dialog
            open={confirmationOpen}
            keepMounted
            onClose={handleConfirmationClose}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle sx = {{textAlign: 'center'}}>
                {"Are you sure you want to delete this event?"}
            </DialogTitle>
            <DialogActions>
                <Button 
                    variant="contained" 
                    onClick={() => handleDeleteEvent(params.id)}
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
        </Dialog>


    </div>
    )
    }

    export default EditEvents;
