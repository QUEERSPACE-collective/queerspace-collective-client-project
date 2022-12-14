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
import allUsers from './allUsers.reducer';
import editUser from "./editUser.reducer";
import event from './event.reducer';
import userEventsReducer from './userEvents.reducer';

import editEvent from './editEvent.reducer';

import newResourceName from './newResourceName.reducer';
import newResourceDescription from './newResourceDescription.reducer';
import newResourceLink from './newResourceLink.reducer';
import viewResources from './viewResources.reducer';


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
  allUsers, //fetch all users from database
  editUser, // fetch specifc user to edit 
  editEvent, //fetch specific event to edit
  event,
  userEventsReducer,
  viewResources,
  newResourceName,
  newResourceDescription,
  newResourceLink,
});

export default rootReducer;
