import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* submitNewEventForm(action){
    try{
        yield axios.post('/api/event', {data: action.payload});
    }
    catch(err){
        console.error(err);
    }
}

function* newEventSaga(){
    yield takeEvery('SUBMIT_NEW_EVENT', submitNewEventForm);
}

export default newEventSaga;