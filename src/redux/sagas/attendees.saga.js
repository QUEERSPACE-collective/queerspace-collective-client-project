import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAttendees(action) {
    try {
        console.log('what is event id', action.payload)
        const response = yield axios.get(`/api/registration/getAttendees/${action.payload}`);
        console.log('fetch attendees response.data is: ', response.data)
        yield put({
            type: "SET_ATTENDEES",
            payload: response.data
        })
    } catch (err) {
        console.error('fetch attendees failed', err);
    }
}

function* fetchAttendeesSaga() {
    yield takeLatest('FETCH_ATTENDEES', fetchAttendees);
}

export default fetchAttendeesSaga;