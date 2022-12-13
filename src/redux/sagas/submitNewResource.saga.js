import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* submitNewResource (action){
    try{
       yield axios.post('/api/resources', {data: action.payload});
    }
    catch(err){
        console.error(err);
    }
}

function* newResourceSaga(){
    yield takeLatest('SUBMIT_NEW_RESOURCE', submitNewResource);
}

export default newResourceSaga;