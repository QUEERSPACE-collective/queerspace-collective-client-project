import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}

// fetch all events
function* fetchEvents () {
    try{
        const response = yield axios.get(`/api/event/`, config)
        console.log('in fetch events saga')
        yield put ({
            type: "SET_EVENTS", 
            payload: response.data
        })

    } catch (error) {
        console.log('error fetchEvents saga', error);
    }
}

// delete a specified event
function* deleteEvent(action){
    try{
        yield axios.delete(`/api/event/${action.payload}`, config);
        console.log('after delte, before fetch');
        yield put({
            type: "FETCH_EVENTS"
        });
        //  after deleting an event, reset the events store with all events from DB
        
    }
    catch(error) {
        console.log('error in deleteEvent saga', error);
    }
}

function* eventSaga () {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('DELETE_EVENT', deleteEvent);
}

export default eventSaga;