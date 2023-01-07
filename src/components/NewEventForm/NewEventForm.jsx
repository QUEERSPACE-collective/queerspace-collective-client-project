import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import newEventProgramArea from '../../redux/reducers/newEventProgramArea.reducer';
import newEventType from '../../redux/reducers/newEventType.reducer';
import './NewEventForm.css';


function NewEventForm() {

  useEffect(() => {
    animater() // Call fade effect
  }, [])

  //Fade effect
  function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
  }
  //Fade effect

  const dispatch = useDispatch();
  const newEventName = useSelector(store=>store.newEventName);
  const newEventDate = useSelector(store=>store.newEventDate);
  const newEventTime = useSelector(store=>store.newEventTime);
  const newEventTimeEnd = useSelector(store => store.newEventTimeEnd)
  const newEventAddress = useSelector(store=>store.newEventAddress);
  const newEventQuestion = useSelector(store=> store.newEventQuestion);
  const newEventStoredQuestions = useSelector(store=> store.newEventStoredQuestions);
  const newEventVolunteerMax = useSelector(store=>store.newEventVolunteerMax);
  const newEventDescription = useSelector(store=>store.newEventDescription);
  const newEventAttendeeMax = useSelector(store=>store.newEventAttendeeMax);
  const newEventProgramArea = useSelector(store=>store.newEventProgramArea);
  const newEventType = useSelector(store=>store.newEventType);
  const newEventVolunteer = useSelector(store=>store.newEventVolunteer);

  const history = useHistory();
  
  function onSubmit(){
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
        type: newEventType,
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
  }
  return (
    <>
    <h1 className='bannerTop' onClick={()=>{dispatch({type: 'EVENT_FORM_FILLER'})}}>New Event Form</h1>

      <label for="newEventName">Event Name: </label>
      <input type='text' id="newEventName" value={newEventName} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_NAME', payload: e.target.value})}}></input>
      <br/>
      <br/>
      <label for='eventType'>Event Type: </label>
      <select name='eventType' id='eventType'>
        <option value='1' onClick={(e)=>{dispatch({type: 'SET_NEW_EVENT_TYPE', payload: e.target.value})}}>Group Hangout</option>
        <option value='2' onClick={(e)=>{dispatch({type: 'SET_NEW_EVENT_TYPE', payload: e.target.value})}}>Family Event</option>
        <option value='3' onClick={(e)=>{dispatch({type: 'SET_NEW_EVENT_TYPE', payload: e.target.value})}}>Training Event</option>
        <option value='4' onClick={(e)=>{dispatch({type: 'SET_NEW_EVENT_TYPE', payload: e.target.value})}}>Mentor Only</option>
      </select>
      <br/>
      <br/>
      <label for="volunteerPicker">Does this event need volunteers?</label>
      <div id="volunteerPicker">
      <label for="isVolunteer">Yes </label>
      <input type="radio" id="isVolunteer" name="volunteers" onClick={()=>{dispatch({type: 'SET_VOLUNTEERS_TRUE'})}}></input>
      <br/>
      <label for="isNotVolunteer">No </label>
      <input type='radio' id='isNotVolunteer' name="volunteers" onClick={()=>{dispatch({type: 'SET_VOLUNTEERS_FALSE'})}}></input>
      </div>
      <br/>
      {newEventVolunteer && newEventVolunteer == true ? (<div>
      <label for='newEventVolunteerMax'>How many volunteers are needed? </label>
      <input type='number' id="newEventVolunteerMax" value={newEventVolunteerMax} onChange={(e)=>{dispatch({type:'SET_NEW_EVENT_VOLUNTEER_MAX', payload: e.target.value})}}></input>
      </div>): (<div></div>)}
      <br/>
      <br/>
      <label for="newEventDate">Date: </label>
      <input type="date"  id="newEventDate" value={newEventDate} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_DATE', payload: e.target.value})}}></input>
      <br/>
      <br/>
      <label for='newEventTime'>Time: </label>
      <input type="time" id="newEventTime" value={newEventTime} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_TIME', payload: e.target.value})}}></input>
      <br/>
      <br/>
      <label for='newEventTimeEnd'>End Time: </label>
      <input type="time" id="newEventTimeEnd" value={newEventTimeEnd} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_TIME_END', payload: e.target.value})}}></input>
      <br/>
      <br/>
      <label for='programArea'>Event Area: </label>
      <select name="programArea" id="programArea">
        <option value='1' onClick={(e)=>{dispatch({type:"SET_NEW_EVENT_PROGRAM_AREA", payload: e.target.value})}}>Twin Cities</option>
        <option value='2' onClick={(e)=>{dispatch({type:"SET_NEW_EVENT_PROGRAM_AREA", payload: e.target.value})}}>St. Cloud</option>
      </select>
      <br/>
      <br/>
      <label for="newEventAddress">Address: </label>
      <input type="text" id="newEventAddress" value={newEventAddress} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_ADDRESS', payload: e.target.value})}}></input>
      <br/>
      <br/>
      <label for="newEventAttendeeMax">How many people can attend? </label>
      <input type='number' id="newEventAttendeeMax" value={newEventAttendeeMax} onChange={(e)=>{dispatch({type:'SET_NEW_EVENT_ATTENDEE_MAX',payload: e.target.value})}}></input>
      <br/>
      <br/>
      <label for="description">Description: </label>
      <input type="text" id='description' value={newEventDescription} onChange={(e)=>{dispatch({type:'SET_NEW_EVENT_DESCRIPTION', payload: e.target.value})}}></input>
      <br/>
      <br/>
      <label for="newEventQuestions">Questions: </label>
      <input type="text" id="newEventQuestions" value={newEventQuestion} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_QUESTION', payload: e.target.value})}}></input>
      <Button size = "small"
      onClick={()=>{dispatch({type: 'STORE_NEW_EVENT_QUESTION', payload: newEventQuestion})}}
      sx = {{bgcolor: '#f39536', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
        '&:hover': {
        backgroundColor: '#f39536',
        boxShadow: '6px 6px 0px #e2bf05'
        },}}
      > 
        Add question 
      </Button>
      <br/> 
      <br/>
      <ul>
        {newEventStoredQuestions.length > 0 && newEventStoredQuestions.map(question=>(
          <li key={question}>{question}
            <Button 
              size = "small"
              onClick={()=>{dispatch({type: 'TARGET_QUETION_REMOVE', payload: question})}}
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, color: 'white',              
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              variant="contained"
              >
                Remove    
            </Button>
          </li>
        ))}
      </ul>
      <button onClick={onSubmit}>Create New Event</button>

    </>
  );
}

export default NewEventForm;