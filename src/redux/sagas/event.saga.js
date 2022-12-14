import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}

<<<<<<< HEAD

// fetch all events
=======
>>>>>>> 94095f56f798861a7936a44261770556d2d2fb41
function* fetchEvents () {
    try{
        const response = yield axios.get(`/api/event/`, config)
        yield put ({
            type: "SET_EVENTS", 
            payload: response.data
        })

    } catch (error) {
        console.log('error fetchEvents saga', error);
    }
}

function* fetchEventDetails(action){
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



<<<<<<< HEAD
// delete a specified event
=======
>>>>>>> 94095f56f798861a7936a44261770556d2d2fb41
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
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeLatest('DELETE_EVENT', deleteEvent);
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails);
}

export default eventSaga;