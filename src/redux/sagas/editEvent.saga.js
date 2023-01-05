import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchEditEvent(action) {
    console.log('fetch edit event ', action.payload);
    try {
        const response = yield axios.get(`/api/event/${action.payload}`);
        console.log('response data for the fetch edit event', response.data );
        yield put({
            type: "SET_EDIT_EVENT",
            payload: response.data
        });
    } catch (err) {
        console.error('get editing event error', err);
    }
}

function* saveEvent(action) {
    console.log('this is the id', action.payload.id);
    if (action.payload.id) {
        yield axios.put(`/api/event/${action.payload.id}`, action.payload);
    }
    yield put ({ type: 'FETCH_ALL_USERS'});
}

function* editEventSaga() {
    yield takeLatest('FETCH_EDIT_EVENT', fetchEditEvent);
    yield takeLatest('SAVE_EVENT', saveEvent);
}

export default editEventSaga;