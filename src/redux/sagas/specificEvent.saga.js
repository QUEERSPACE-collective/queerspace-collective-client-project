import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}

// going to user.router.js
function* fetchOneEvent(action){
    console.log('event id is',action.payload)
    try{
      const response = yield axios.get(`/api/event/specificEvent/${action.payload}`, config)
      yield put({
        type: 'SET_SPECIFIC', 
        payload: response.data
      })
    } catch (error) {
        console.log('error getting users registered events at saga', error)
    }
  }


function* deleteUserEvent(action){
  try{
    yield axios.delete(`/api/user/events/${action.payload}`, config)
    yield put({type: 'FETCH_USER_EVENTS'})
  } catch (error) {
    console.log('error deleting user event in saga', error)
  }
}

function* specificEvent () {
    yield takeLatest ('FETCH_SPECIFIC_EVENT', fetchOneEvent);

}

export default specificEvent;