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

function* fetchEditUser(action) {
    try {
        const response = yield axios.get(`/api/allusers/${action.payload}`);

        yield put({
            type: "SET_EDIT_USER",
            payload: response.data
        });
    } catch (err) {
        console.error('get editing user error', err);
    }
}

function* saveUser(action) {
    if (action.payload.id) {
        yield axios.put(`/api/allusers/${action.payload.id}`, action.payload);
    }
}

function* allUsersSaga() {
    yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
    yield takeLatest('FETCH_EDIT_USER', fetchEditUser);
    yield takeLatest('SAVE_USER', saveUser);
}

export default allUsersSaga;