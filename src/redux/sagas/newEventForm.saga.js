import axios from "axios";
import { takeEvery } from "redux-saga/effects";

function* submitNewEventForm(action) {
    try {
        yield axios.post('/api/event', { data: action.payload });
    }
    catch (err) {
        console.error('submitNewEventForm saga error',err);
    }
}

function* newEventSaga() {
    yield takeEvery('SUBMIT_NEW_EVENT', submitNewEventForm);
}

export default newEventSaga;