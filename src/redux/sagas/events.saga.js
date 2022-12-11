import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// grabs all events. Triggered on admin's AllEventsList page
function* fetchAllEvents(){
    let response = yield axios.get(`api/events`);
    yield put({
        type:"SET_EVENTS",
        payload: response.data
    });
}

function* eventsSaga() {
    yield takeEvery( "FETCH_ALL_EVENTS", fetchAllEvents )
}

export default eventsSaga;