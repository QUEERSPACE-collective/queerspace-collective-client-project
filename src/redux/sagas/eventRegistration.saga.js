import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}


function* registerForEvent (action) {
    try {
        yield axios.post(`/api/registration`, {data: action.payload}, config)
    } catch (error) {
        console.log('error registering user for event', error)
    }
}

function* addUserAnswer(action) {
    try{
        yield axios.post(`/api/answers`, action.payload)

    } catch (error){
        console.log('error adding user answers on registration form in saga', error)
    }

}

function* fetchEventRegisteredUsers(action){
    try{
        const response = yield axios.get(`/api/registration/registered-users/${action.payload}`, config)
        yield put({type: 'SET_EVENT_REGISTERED_USERS', payload: response.data})
    } catch (error) {
        console.error('error fetching users registered for an event', error)
    }
}

function* addGuests (action) {
    console.log('how many guests', action.payload)
    try{
      yield axios.put(`/api/answers/guests`, action.payload, config)
      yield put ({type: 'SET_ATTENDEES'})
    } catch (error) {
      console.log('error adding guests in saga', error)
    }
  }

function* eventRegistrationSaga () {
    yield takeLatest ('REGISTER_FOR_EVENT', registerForEvent);
    yield takeLatest('ADD_USER_ANSWER', addUserAnswer);
    yield takeLatest('FETCH_EVENT_REGISTERED_USERS', fetchEventRegisteredUsers);
    yield takeLatest ('ADD_ATTENDEES', addGuests);
}

export default eventRegistrationSaga;