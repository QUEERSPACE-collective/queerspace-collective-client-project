import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchEditUser(action) {
    try {
        const response = yield axios.get(`/api/allusers/${action.payload}`);
        console.log(action);
        yield put({
            type: "SET_EDIT_USER",
            payload: response.data
        });
    } catch (err) {
        console.error('get editing user error', err);
    }
}

function* saveUser(action) {
    console.log('this is the id', action.payload.id);
    if (action.payload.id) {
        yield axios.put(`/api/allusers/${action.payload.id}`, action.payload);
    }
    // yield put ({ type: 'FETCH_ALL_USERS'});
}

function* deleteUser(action) {
    console.log('in delete user fn');
    try {
        yield axios.delete(`/api/allusers/${action.payload}`);
        yield put({ type: 'FETCH_ALL_USERS' })
    } catch (err) {
        console.log("error deleting item", err);
    }
}

function* fetchEditProfile(action) {
    try {
      const response = yield axios.get(`/api/user/${action.payload}`);
      yield put({ type: 'SET_EDIT_PROFILE', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* saveProfile(action) {
    if (action.payload.id) {
        yield axios.put(`/api/user/${action.payload.id}`, action.payload);
    }
    yield put({ type: "FETCH_USER" });
}

function* resetEmail(action) {
    try {
        yield axios.post("/api/user/reset", action.payload);
    } catch (error) {
        console.log('error resetting pw', error);
    }
}

function* resetPassword(action) {
    if (action.payload.token) {
        yield axios.put(`/api/user/reset/${action.payload.token}`, action.payload);
    }
}

function* editUsersSaga() {
    yield takeLatest('FETCH_EDIT_USER', fetchEditUser);
    yield takeLatest('SAVE_USER', saveUser);
    yield takeLatest('DELETE_USER', deleteUser);
    yield takeLatest('FETCH_EDIT_PROFILE', fetchEditProfile);
    yield takeLatest('SAVE_PROFILE', saveProfile);
    yield takeLatest("SEND_RESET_EMAIL", resetEmail);
    yield takeLatest("RESET_PASSWORD", resetPassword);
}

export default editUsersSaga;