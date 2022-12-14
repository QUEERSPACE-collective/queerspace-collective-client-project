import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAllUsers() {
    console.log("in fetch allusers");

    try {
        const response = yield axios.get("/api/allusers");
        console.log('what the heck is response.data',response.data)
        yield put ({
            type: "SET_ALL_USERS",
            payload: response.data
        })
    } catch (error) {
        console.error('get all users request failed', error);
    }
}

// function* showOneUser(action) {
//     console.log('in showOneUser',action.payload);
//     try {
//         const response = yield axios.get(`/api/allusers/${action.payload}`);
//         yield put ({
//             type: "SET_ALL_USERS",
//             payload: response.data
//         })
//     } catch (error) {
//         console.error('get showOneUser request failed', error);
//     }
// }

function* allUsersSaga() {
    yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
    // yield takeLatest('SHOW_ONE_USER', showOneUser);
}

export default allUsersSaga;