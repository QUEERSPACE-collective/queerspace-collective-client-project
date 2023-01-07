import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEditEvent(action) {
    console.log('fetchEditEvent action.payload is: ', action.payload);
    try {
        const response = yield axios.get(`/api/event/${action.payload}`);
        console.log('FetchEditEvent response.data is: ', response.data);
        yield put({
            type: "SET_EDIT_EVENT",
            payload: response.data
        });
    } catch (err) {
        console.error('fetchEditEvent GET editing event error', err);
    }
}

function* saveEvent(action) {
    console.log('saveEvent id(action.payload.id) is: ', action.payload.id);
    if (action.payload.id) {
        yield axios.put(`/api/event/${action.payload.id}`, action.payload);
    }
    yield put({ type: 'FETCH_ALL_USERS' });
}

function* editEventSaga() {
    yield takeLatest('FETCH_EDIT_EVENT', fetchEditEvent);
    yield takeLatest('SAVE_EVENT', saveEvent);
}

export default editEventSaga;