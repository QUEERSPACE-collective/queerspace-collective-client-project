import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}


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

function* fetchEventQuestions (action) {
    try {
        const response = yield axios.get(`/api/event/questions/${action.payload}`, config)
        yield put ({type: 'SET_EVENT_QUESTIONS', payload: response.data})
    } catch(error) {
        console.log('error fetching event questions in saga', error)
    }
}


function* eventSaga () {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeLatest('DELETE_EVENT', deleteEvent);
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeLatest('FETCH_EVENT_QUESTIONS', fetchEventQuestions);
}

export default eventSaga;