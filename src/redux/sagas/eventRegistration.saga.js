import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}




function* registerForEvent (action) {
    try {
        yield axios.post(`/api/event/register/${action.payload}`, config)
    } catch (error) {
        console.log('error registering user for event', error)
    }
}



function* eventRegistrationSaga () {
    yield takeLatest ('REGISTER_FOR_EVENT', registerForEvent)
}

export default eventRegistrationSaga;