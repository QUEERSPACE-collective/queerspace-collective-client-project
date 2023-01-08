import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAllUsers() {
    console.log("in fetch allusers");
    try {
        const response = yield axios.get("/api/allusers");
        console.log('fetchAllUsers response.data is: ', response.data)
        yield put({
            type: "SET_ALL_USERS",
            payload: response.data
        })
    } catch (err) {
        console.error('GETting all users request failed', err);
    }
}

function* allUsersSaga() {
    yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
}

export default allUsersSaga;