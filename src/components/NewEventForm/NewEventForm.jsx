import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { OutlinedInput, Card, List, ListItem, Select, MenuItem } from '@mui/material';
import './NewEventForm.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function NewEventForm() {
  useEffect(() => {
    pageFadeIn()
  }, [])

  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

  const dispatch = useDispatch();
  const newEventName = useSelector(store => store.newEventName);
  const newEventDate = useSelector(store => store.newEventDate);
  const newEventTime = useSelector(store => store.newEventTime);
  const newEventTimeEnd = useSelector(store => store.newEventTimeEnd)
  const newEventAddress = useSelector(store=>store.newEventAddress);
  const newEventQuestion = useSelector(store=> store.newEventQuestion);
  const newEventStoredQuestions = useSelector(store=> store.newEventStoredQuestions);
  const newEventVolunteerMax = useSelector(store=>store.newEventVolunteerMax);
  const newEventDescription = useSelector(store=>store.newEventDescription);
  const newEventAttendeeMax = useSelector(store=>store.newEventAttendeeMax);
  const newEventProgramArea = useSelector(store=>store.newEventProgramArea);
  const newEventType = useSelector(store=>store.newEventType); //
  const newEventVolunteer = useSelector(store=>store.newEventVolunteer);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const history = useHistory();

  function onSubmit() {
    let dateTime = `${newEventDate} ${newEventTime}`;
    let dateTimeEnd = `${newEventDate} ${newEventTimeEnd}`;
    dispatch({
      type: 'SUBMIT_NEW_EVENT',
      payload: {
        name: newEventName,
        dateTime: new Date(dateTime),
        dateTimeEnd: new Date(dateTimeEnd),
        location: newEventAddress,
        programLocationID: newEventProgramArea,
        type: newEventType, //
        attendeeMax: newEventAttendeeMax,
        hasVolunteers: newEventVolunteer,
        volunteerMax: newEventVolunteerMax,
        description: newEventDescription,
        questions: newEventStoredQuestions,
      }
    })
    dispatch({
      type: 'CLEAR_NEW_EVENT_FORM'
    });
    handleAlertClick();
    setTimeout(() => {
      history.push('/homepage')
    }, 1500); 
  }


  const handleAlertClick = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };


  return (
    <>
      <h1 className='bannerTop'>Create New Event</h1>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m:2,
          p:2
        }}
      >
        <label for="newEventName">Event Name: </label>
        <OutlinedInput sx={{m:1, width: 500}} type='text' id="newEventName" value={newEventName} onChange={(e) => { dispatch({ type: 'SAVE_NEW_EVENT_NAME', payload: e.target.value }) }}></OutlinedInput>
        
        
        <label for='eventType'>Event Type: </label>
        <select name='eventType' id='eventType' onChange={(e) => { dispatch({ type: 'SET_NEW_EVENT_TYPE', payload: e.target.value }) }}>
          <option value='1'>Group Hangout</option>
          <option value='2'>Family Event</option>
          <option value='3'>Training Event</option>
          <option value='4'>Mentor Only</option>
        </select>
        
        
        <label for="volunteerPicker">Does this event need volunteers?</label>
        <div id="volunteerPicker">
          <label for="isVolunteer">Yes </label>
          <input type="radio" id="isVolunteer" name="volunteers" onClick={() => { dispatch({ type: 'SET_VOLUNTEERS_TRUE' }) }}></input>
          
          <label for="isNotVolunteer">No </label>
          <input type='radio' id='isNotVolunteer' name="volunteers" onClick={() => { dispatch({ type: 'SET_VOLUNTEERS_FALSE' }) }}></input>
        </div>
        
        {newEventVolunteer && newEventVolunteer == true ? 
        (<div>
          <label for='newEventVolunteerMax'>How many volunteers are needed? </label>
          < OutlinedInput sx={{m:1}} type='number' id="newEventVolunteerMax" value={newEventVolunteerMax} onChange={(e) => { dispatch({ type: 'SET_NEW_EVENT_VOLUNTEER_MAX', payload: e.target.value }) }}></OutlinedInput>
         </div>
         ) 
         : 
         (<div></div>)}
        
        <label for="newEventDate">Date: </label>
          <OutlinedInput sx={{m:1}} type="date" id="newEventDate" value={newEventDate} onChange={(e) => { dispatch({ type: 'SAVE_NEW_EVENT_DATE', payload: e.target.value }) }}></OutlinedInput>
          
        <label for='newEventTime'>Time: </label>
          <OutlinedInput sx={{m:1}} type="time" id="newEventTime" value={newEventTime} onChange={(e) => { dispatch({ type: 'SAVE_NEW_EVENT_TIME', payload: e.target.value }) }}></OutlinedInput>
        
        
        <label for='newEventTimeEnd'>End Time: </label>
          <OutlinedInput sx={{m:1}} type="time" id="newEventTimeEnd" value={newEventTimeEnd} onChange={(e) => { dispatch({ type: 'SAVE_NEW_EVENT_TIME_END', payload: e.target.value }) }}></OutlinedInput>
                  
        <label for='programArea'>Event Area: </label> 
        <select name="programArea" id="programArea">
          <option value='1' onClick={(e) => { dispatch({ type: "SET_NEW_EVENT_PROGRAM_AREA", payload: e.target.value }) }}>Twin Cities</option>
          <option value='2' onClick={(e) => { dispatch({ type: "SET_NEW_EVENT_PROGRAM_AREA", payload: e.target.value }) }}>St. Cloud</option>
        </select>
        
        
        <label for="newEventAddress">Address: </label>
          <OutlinedInput sx={{m:1}} type="text" id="newEventAddr ss" value={newEventAddress} onChange={(e) => { dispatch({ type: 'SAVE_NEW_EVENT_ADDRESS', payload: e.target.value }) }}></OutlinedInput>

        <label for="newEventAttendeeMax">How many people can attend? </label>
          <OutlinedInput sx={{m:1}} type='number' id="newEventAttendeeMax" value={newEventAttendeeMax} onChange={(e) => { dispatch({ type: 'SET_NEW_EVENT_ATTENDEE_MAX', payload: e.target.value }) }}></OutlinedInput>
        
        
        <label for="description">Description: </label>
          <OutlinedInput sx={{m:1}} type="text" id='description' value={newEventDescription} onChange={(e) => { dispatch({ type: 'SET_NEW_EVENT_DESCRIPTION', payload: e.target.value }) }}></OutlinedInput>
        
        
        <label for="newEventQuestions">Questions: </label>
          <OutlinedInput sx={{m:1}} type="text" id="newEventQuestions" value={newEventQuestion} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_QUESTION', payload: e.target.value})}}></OutlinedInput>
       
        <Button size = "small"
          onClick={()=>{dispatch({type: 'STORE_NEW_EVENT_QUESTION', payload: newEventQuestion})}}
          sx = {{
            bgcolor: '#f39536', 
            width: 150,  
            fontWeight: 'bold', 
            wordSpacing: 1, 
            m: 2, 
            color:'white',     
              '&:hover': {
              backgroundColor: '#f39536',
              boxShadow: '6px 6px 0px #e2bf05'
              },}}
        > 
          Add question 
        </Button>
        
        <List>
          {newEventStoredQuestions.length > 0 && newEventStoredQuestions.map(question=>(
            <ListItem key={question}>{question}
              <Button 
               
                onClick={()=>{dispatch({type: 'TARGET_QUESTION_REMOVE', payload: question})}}
                sx = {{
                  bgcolor: '#cf2317', 
                  fontWeight: 'bold', 
                  wordSpacing: 1, 
                  color: 'white',
                  m:2,            
                    '&:hover': {
                    backgroundColor: '#cf2317',
                    boxShadow: '6px 6px 0px #fe6d0e'
                    },
                }}
                variant="contained"
                >
                  <DeleteIcon/>    
              </Button>
            </ListItem>
          ))}
        </List>
      </Card>

      <Button onClick={onSubmit}
        sx = {{bgcolor: '#46a452e6', fontWeight: 'bold', letterSpacing: 1.5, m: 2, color: 'white',               
        '&:hover': {
        backgroundColor: '#46a452e6',
        boxShadow: '6px 6px 0px #82bc27e0'
        },}}
      >
        Create Event
      </Button>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={alertOpen} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            Event Created!
          </Alert>
        </Snackbar>
      </Stack>

    </>
  );
}

export default NewEventForm;