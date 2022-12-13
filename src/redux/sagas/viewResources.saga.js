import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

function* viewResources(action){
    try{
        let response = yield axios.get('/api/resources');
        yield put({
            type: 'STORE_RESOURCES',
            payload: response.data
        });
    }
    catch(err){
        console.error(err);
    }
}

function* viewResourcesSaga(){
    yield takeLatest('GET_RESOURCES', viewResources);
}

export default viewResourcesSaga;