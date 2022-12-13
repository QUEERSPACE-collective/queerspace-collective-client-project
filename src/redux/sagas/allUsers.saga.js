import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAllUsers() {
    console.log("in fetch allusers");

    try {
        const response = yield axios.get("/api/allusers");
        yield put ({
            type: "SET_ALL_USERS",
            payload: response.data
        })
    } catch (error) {
        console.error('get all users request failed', error);
    }
}

function* allUsersSaga() {
    yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
}

export default allUsersSaga;