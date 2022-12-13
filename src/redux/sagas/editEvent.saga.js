import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchEditEvent(action) {
    try {
        const response = yield axios.get(`/api/allusers/${action.payload}`);
        yield put({
            type: "SET_EDIT_EVENT",
            payload: response.data
        });
    } catch (err) {
        console.error('get editing event error', err);
    }
}

function* editUsersSaga() {
    yield takeLatest('FETCH_EDIT_EVENT', fetchEditEvent);
    yield takeLatest('SAVE_EVENT', saveEvent);
}
