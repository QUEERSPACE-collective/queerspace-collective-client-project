import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Slide from '@mui/material/Slide';
import { Snackbar } from '@mui/material';
import { Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { atcb_action, atcb_init } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
import moment from 'moment-timezone';
import './EventAttendees.css';
function EventAttendees() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const registeredAttendees = useSelector(store => store.eventRegisteredUsers)
    const eventDetails = useSelector(store => store.currentEvent);
    const userEvents = useSelector(store => store.userEventsReducer);
    const eventQuestions = useSelector(store => store.eventQuestions);
    const registrationAnswer = useSelector(store => store.registrationAnswers);
    let [cnt, setCnt] = useState(1);
    const theAttendees = useSelector(store => store.attendeesReducer);
    const allUsers = useSelector(store => store.allUsers);

    console.log('what are the attendees?',theAttendees);

    useEffect(() => {
        pageFadeIn(),
            dispatch({
                type: "FETCH_EVENT_REGISTERED_USERS",
                payload: params.id
            }),
            dispatch({
                type: 'FETCH_EVENT_DETAILS',
                payload: params.id
            }),
            dispatch({ type: 'FETCH_USER_EVENTS' }),
            dispatch({type:'FETCH_ATTENDEES', payload: params.id})


    }, [params.id])

    function pageFadeIn() {
        document.body.classList.remove("withOpacity");
        document.body.classList.add("noOpacity");
        setTimeout(() => document.body.classList.remove("noOpacity"), 100);
        setTimeout(() => document.body.classList.add("withOpacity"), 100);
    };

    let isRegistered = userEvents.some(event => event.id === eventDetails?.id);

    return (
        <>
<Button 
        onClick={() => history.push('/allevents')} 
        sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590',                
        '&:hover': {
        fontSize: 16
        },}}
        >
        <ArrowCircleLeftIcon/>Back to Events
      </Button>
      
      <div className='event-details-container adminEventViewContainer'>
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
            Max attendees: {eventDetails.attendeeMax}
          </p>
          <p>
            Registered Attendees: {eventDetails.totalAttendees}  
          </p>
            {eventDetails.hasVolunteers && 
              <p> 
                Registered Volunteers: {eventDetails.registeredVolunteers}
              </p>
            }
            <p>
            Total Registered: {Number(eventDetails.totalAttendees) + Number(eventDetails.registeredVolunteers)}

            </p>

            <p>
            {eventDetails.description}
          </p>

        </Box>
        <br></br>
        
        </div>
            <div className={"userAnswerQuestionsContainer"}>
            {/* <h4>Attendees: {Number(eventDetails.totalAttendees)}</h4> */}
                {/* <h4>Attendees + Volunteers: {Number(eventDetails.totalAttendees) + Number(eventDetails.registeredVolunteers)}</h4> */}
                
                {registeredAttendees.map(attendee => (
                    <>  
                        <h3>Username: {attendee.username}</h3>
                        {theAttendees.map(attend =>(
                                <>
                                <h3 key={attend.id}>{attendee.name}'s Guest Count: {attend.userAttendees}</h3>
                                </>                     
                        ))}
                        
                        <ul>
                            {attendee.question_answer.map(answer => (
                                <>
                                    <li>Q: {answer[0]}</li>
                                    <li>A: {answer[1]}</li>
                                </>
                            ))}
                            <hr></hr>
                        </ul>
                                               
                    </>
                ))}
            </div>
        </>
    )
}

export default EventAttendees;