import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import allUsersSaga from './allUsers.saga';
import editUsersSaga from './editUsers.saga';
import editEventSaga from './editEvent.saga';
import eventSaga from './event.saga';
import eventRegistrationSaga from './eventRegistration.saga';
import userEvents from './userEvents.saga';
import viewResourcesSaga from './viewResources.saga';
import newResourceSaga from './submitNewResource.saga';
import newEventSaga from './newEventForm.saga'; 
import addUserSaga from './addUser.saga';
import multerSaga from './multer.saga';
// import specificEvent from './specificEvent.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    eventSaga(),
    eventRegistrationSaga(),
    userEvents(),
    allUsersSaga(),
    newEventSaga(),
    editUsersSaga(),
    editEventSaga(),
    eventSaga(),
    viewResourcesSaga(),
    newResourceSaga(),
    addUserSaga(),
    multerSaga(),
    // specificEvent(),
  ]);
}
