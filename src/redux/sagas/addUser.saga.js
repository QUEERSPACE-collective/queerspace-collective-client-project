import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addUser(action) {
    try {
        yield axios.post('/api/user/adduser', {data: action.payload})
        yield put({ type: 'FETCH_ALL_USERS' })
    } catch (err){
        console.log('post failed', err);
    }
}

function* addUserSaga() {
    yield takeLatest("ADD_USER", addUser);
}

export default addUserSaga;