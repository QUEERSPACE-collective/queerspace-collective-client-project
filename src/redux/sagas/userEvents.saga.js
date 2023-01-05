import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}

// going to user.router.js
function* fetchUserEvents(){
    try{
      const response = yield axios.get('/api/user/events', config)
      yield put({
        type: 'SET_USER_EVENTS', 
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



function* userEvents () {
    yield takeLatest ('FETCH_USER_EVENTS', fetchUserEvents);
    yield takeLatest ('DELETE_USER_EVENT', deleteUserEvent);
}

export default userEvents;