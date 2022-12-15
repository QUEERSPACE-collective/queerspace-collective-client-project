import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

const config = {
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
}




function* registerForEvent (action) {
    try {
        yield axios.post(`/api/registration/${action.payload}`, config)
        yield put({})
    } catch (error) {
        console.log('error registering user for event', error)
    }
}

function* addUserAnswer(action) {
    console.log('the users answer is', action.payload)
    try{
        yield axios.post(`/api/answers`, action.payload)

    } catch (error){
        console.log('error adding user answers on registration form in saga', error)
    }

}

// function* storeUserAnswer (action) {
//     try{
//         yield put ({
//             type: 'STORE_USER_ANSWER',
//             payload: action.payload
//         })
//     } catch (error) {
//         console.log('error storing user answer', error)
//     }
// }



function* eventRegistrationSaga () {
    yield takeLatest ('REGISTER_FOR_EVENT', registerForEvent);
    // yield takeLatest('STORE_USER_ANSWER', storeUserAnswer)
    yield takeLatest('ADD_USER_ANSWER', addUserAnswer);
}

export default eventRegistrationSaga;