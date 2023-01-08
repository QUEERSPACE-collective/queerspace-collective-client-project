import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
}

// GET all events
function* fetchEvents() {
    try {
        const response = yield axios.get(`/api/event/`, config)
        yield put({
            type: "SET_EVENTS",
            payload: response.data
        })
    } catch (err) {
        console.log('error fetchEvents saga', err);
    }
}

function* fetchEventDetails(action) {
    try {
        const response = yield axios.get(`/api/event/${action.payload}`, config)
        yield put({
            type: 'SET_EVENT_DETAILS',
            payload: response.data
        })
    } catch (err) {
        console.log('fetchEventDetails GET event details error', err)
    }
}

// DELETE a specified event
function* deleteEvent(action) {
    try {
        yield axios.delete(`/api/event/${action.payload}`, config);
        yield put({
            type: "FETCH_EVENTS"
        });
        //  after deleting an event, reset the events store with all events from DB
    }
    catch (err) {
        console.log('error in deleteEvent saga', err);
    }
}

function* fetchEventQuestions(action) {
    try {
        const response = yield axios.get(`/api/event/questions/${action.payload}`, config)
        yield put({ type: 'SET_EVENT_QUESTIONS', payload: response.data })
    } catch (err) {
        console.log('error fetching event questions in saga', err)
    }
}

function* changeEventOrder(action) {
    try {
        const response = yield axios.get(`/api/event/order/${action.payload}`, config)
        yield put({ type: 'SET_ORDER', payload: response.data })
    } catch (err) {
        console.log("error in fetching event order in saga", err)
    }
}
function* eventSaga() {
    yield takeLatest('FETCH_EVENTS', fetchEvents);
    yield takeLatest('DELETE_EVENT', deleteEvent);
    yield takeLatest('FETCH_EVENT_DETAILS', fetchEventDetails);
    yield takeLatest('FETCH_EVENT_QUESTIONS', fetchEventQuestions);
    yield takeLatest('CHANGE_EVENT_ORDER', changeEventOrder);
}

export default eventSaga;