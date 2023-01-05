// import { put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';

// const config = {
//     headers: {"Content-Type": "application/json"},
//     withCredentials: true,
// }

// function* fetchOneEvent(action){
//     console.log('event id is',action.payload)
//     try{
//       const response = yield axios.get(`/api/event/specificEvent/${action.payload}`, config)
//       yield put({
//         type: 'SET_SPECIFIC', 
//         payload: response.data
//       })
//     } catch (error) {
//         console.log('error with GET in specificEvent.saga.js', error)
//     }
//   }

// function* specificEvent () {
//     yield takeLatest ('FETCH_SPECIFIC_EVENT', fetchOneEvent);
// }

// export default specificEvent;