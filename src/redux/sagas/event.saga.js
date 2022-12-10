import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}


function* fetchEvents () {
    try{
        const response = yield axios.get(`/api/event/`, config)
        console.log('in fetch events saga')



    } catch (error) {
        console.log('error GETting events from server', error)
    }
}





function* eventSaga () {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
}

export default eventSaga;