import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './NewEventForm.css';

// CUSTOM COMPONENTS

function NewEventForm() {

  const dispatch = useDispatch();
  const newEventName = useSelector(store=>store.newEventName);
  const newEventDate = useSelector(store=>store.newEventDate);
  const newEventTime = useSelector(store=>store.newEventTime);
  const newEventAddress = useSelector(store=>store.newEventAddress);
  const newEventQuestion = useSelector(store=> store.newEventQuestion);
  const newEventStoredQuestions = useSelector(store=> store.newEventStoredQuestions);
  const newEventVolunteerMax = useSelector(store=>store.newEventVolunteerMax);
  const newEventDescription = useSelector(store=>store.newEventDescription);


  const history = useHistory();
  
  function onSubmit(){
    dispatch({
      type: 'SUBMIT_NEW_EVENT',
      payload: {
        name: newEventName,
        dateTime: new Date(newEventDate, newEventTime).getTime() / 1000,
        location: newEventAddress,



      }
    })
    dispatch({
      type: 'CLEAR_NEW_EVENT_FORM'
    });
  }
  return (
    <>
    <h1>New Event Form</h1>

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
      <label for="isVolunteer">Yes</label>
      <input type="radio" id="isVolunteer" name="volunteers" onClick={()=>{dispatch({type: 'SET_VOLUNTEERS_TRUE'})}}></input>
      <br/>
      <label for="isNotVolunteer">No</label>
      <input type='radio' id='isNotVolunteer' name="volunteers" onClick={()=>{dispatch({type: 'SET_VOLUNTEERS_FALSE'})}}></input>
      </div>
      <br/>
      <label for='newEventVolunteerMax'>If yes, how many volunteers are needed? </label>
      <input type='number' id="newEventVolunteerMax" value={newEventVolunteerMax} onChange={(e)=>{dispatch({type:'SET_NEW_EVENT_VOLUNTEER_MAX', payload: e.target.value})}}></input>
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
      <input type='number' id="newEventAttendeeMax"></input>
      <br/>
      <br/>
      <label for="newEventQuestions">Questions: </label>
      <input type="text" id="newEventQuestions" value={newEventQuestion} onChange={(e)=>{dispatch({type: 'SAVE_NEW_EVENT_QUESTION', payload: e.target.value})}}></input>
      <button onClick={()=>{dispatch({type: 'STORE_NEW_EVENT_QUESTION', payload: newEventQuestion})}}> Add question </button>
      <br/> 
      <br/>
      <label for="description">Description: </label>
      <input type="text" id='description' value={newEventDescription} onChange={(e)=>{dispatch({type:'SET_NEW_EVENT_DESCRIPTION', payload: e.target.value})}}></input>
      <br/>
      <br/>
      <ul>
        {newEventStoredQuestions.length > 0 && newEventStoredQuestions.map(event=>(
          <li key={event}>{event}</li>
        ))}
      </ul>
      <button onClick={onSubmit}>Create New Event</button>

    </>
  );
}

export default NewEventForm;