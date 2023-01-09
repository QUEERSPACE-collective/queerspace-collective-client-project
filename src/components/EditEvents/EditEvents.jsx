import * as React from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment-timezone';

function EditEvents(){
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

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

    const handleDeleteEvent = (id) => {
        dispatch({
          type: 'DELETE_EVENT',
          payload: id
        })
        setTimeout(() => {
            history.push('/allevents')
          }, 1500); 
      };


    const [confirmationOpen, setConfirmatinoOpen] = React.useState(false);
    const handleConfirmationOpen = () => {
      setConfirmatinoOpen(true);
    };
    const handleConfirmationClose = () => {
      setConfirmatinoOpen(false)
    }

//Fade effect
function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }
//Fade effect

    const editEvent = useSelector(store => store.editEvent);
    console.log(editEvent);

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
        <>
            <Button
                onClick={() => history.push('/allevents')}
                sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', m: 3,                
                '&:hover': {
                fontSize: 16
                },}}
                >
                <ArrowCircleLeftIcon/>Back To Events List
            </Button>
            <div>
                <h2 className='bannerTop'>Edit Event</h2>
            </div>
            
            <form onSubmit={onSubmit}>
                 {/* edit event name */}
                <label>
                    Event Name:
                </label>
                <input
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
                


                <input
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
                


                <input
                    type="datetime-local"
                    value={editEvent && moment(editEvent.dateTimeEnd).format("YYYY-MM-DD HH:mm")}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {dateTimeEnd: new Date(evt.target.value)}
                    })}
                />

                {/* end edit event date time */}
                {/* edit description */}
                <label>
                    Edit Description:
                </label>
                
                <input
                    value={editEvent && editEvent.description}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {description: evt.target.value}
                    })}
                />
                {/* end edit description */}
                {/* edit event location */}
                <label>
                    Edit Location:
                </label>
                <input
                    value={editEvent && editEvent.location}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {location: evt.target.value}
                    })}
                />
                {/* end edit event location */}
                {/* edit event type */}
                <label>
                    Edit Type:
                </label>
                <input
                    value={editEvent && editEvent.type}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {type: evt.target.value}
                    })}
                />
                {/* end edit event type */}
                {/* edit event Program location */}
                <label>
                    Edit Program Location:
                </label>
                <input
                    value={editEvent && editEvent.programLocationID}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_EVENT',
                        payload: {programLocationID: evt.target.value}
                    })}
                />
                {/* end edit event program location */}
                <Button 
                    type="submit"
                    sx = {{bgcolor: '#46a452e6', fontWeight: 'bold', letterSpacing: 1.5, m: 2, color: 'white',               
                    '&:hover': {
                    backgroundColor: '#46a452e6',
                    boxShadow: '6px 6px 0px #82bc27e0'
                    },}}
                >Submit</Button>
            </form>


            <Button 
                sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                '&:hover': {
                backgroundColor: '#cf2317',
                boxShadow: '6px 6px 0px #fe6d0e'
                },}}
                variant="contained"
                // value={allUsers.id}
                onClick = {handleConfirmationOpen}
                >
                    Delete Event
                </Button>

                <Dialog
                open={confirmationOpen}
                keepMounted
                onClose={handleConfirmationClose}
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle sx = {{textAlign: 'center'}}>{"Are you sure you want to delete this event?"}</DialogTitle>
                <DialogActions>
                <Button variant="contained" 
                    onClick={() => handleDeleteEvent(params.id)}
                // onClick={eventUnregistration}
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


        </>
    )
}

export default EditEvents;
