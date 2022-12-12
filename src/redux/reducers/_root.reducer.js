import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import newEventName from './newEventName.reducer';
import newEventDate from './newEventDate.reducer';
import newEventTime from './newEventTime.reducer';
import newEventAddress from './newEventAddress.reducer';
import newEventQuestion from './newEventQuestion.reducer';
import newEventStoredQuestions from './newEventStoredQuestions.reducer';
import newEventVolunteer from './newEventVolunteer.reducer';
import newEventVolunteerMax from './newEventVolunteerMax.reducer';
import newEventType from './newEventType.reducer';
import newEventProgramArea from './newEventProgramArea.reducer';
import newEventAttendeeMax from './newEventAttendeeMax.reducer';
import newEventDescription from './newEventDescription.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in'
  newEventName, 
  newEventDate,
  newEventTime, 
  newEventAddress,
  newEventQuestion, 
  newEventStoredQuestions,
  newEventVolunteer,
  newEventVolunteerMax,
  newEventType,
  newEventProgramArea,
  newEventAttendeeMax,
  newEventDescription,
  });

export default rootReducer;
