import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
}

function* registerForEvent(action) {
  console.log('eventRegisteration saga action.payload is: ', action.payload)
  try {
    yield axios.post(`/api/registration`, { data: action.payload }, config)
  } catch (err) {
    console.log('registerForEvent saga error', err)
  }
}

function* unregisterForEvent(action) {
  try {
    yield axios.delete(`/api/registration/${action.payload}`, config)
    yield put({ type: 'FETCH_USER_EVENTS' })
  } catch (err) {
    console.log('unregisterForEvent saga deletion error', err)
  }
}

function* fetchEventRegisteredUsers(action) {
  try {
    const response = yield axios.get(`/api/registration/registered-users/${action.payload}`, config)
    yield put({ type: 'SET_EVENT_REGISTERED_USERS', payload: response.data })
  } catch (err) {
    console.error('fetchEventRegisteredUsers saga error', err)
  }
}

function* addGuests(action) {
  console.log('how many guests?', action.payload)
  try {
    yield axios.put(`/api/answers/guests`, action.payload, config)
    yield put({ type: 'SET_ATTENDEES' })
  } catch (err) {
    console.log('error adding guests in saga', err)
  }
}

function* eventRegistrationSaga() {
  yield takeLatest('REGISTER_FOR_EVENT', registerForEvent);
  yield takeLatest('UNREGISTER_FOR_EVENT', unregisterForEvent);
  yield takeLatest('FETCH_EVENT_REGISTERED_USERS', fetchEventRegisteredUsers);
  yield takeLatest('ADD_ATTENDEES', addGuests);
}

export default eventRegistrationSaga;