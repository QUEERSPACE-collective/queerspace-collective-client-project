import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}


function* fetchEvents(){
    try{
        const response = yield axios.get(`/api/event/`, config)
        console.log('in fetch events saga')
        yield put ({
            type: "SET_EVENTS", 
            payload: response.data
        })

    } catch (error) {
        console.log('error GETting events from server', error)
    }
}

function* fetchEventDetails(action){
    console.log('in fetch event details saga with params', action.payload)
    try { 
        const response = yield axios.get(`/api/event/${action.payload}`, config)
        yield put ({
            type: 'SET_EVENT_DETAILS',
            payload: response.data
        })
    } catch (error) {
        console.log('error GETting event details from server', error)
    }
}





function* eventSaga () {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails)
}

export default eventSaga;