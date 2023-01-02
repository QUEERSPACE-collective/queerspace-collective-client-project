import axios from 'axios';
import FormData from 'form-data';
import { takeEvery, put,takeLatest } from "redux-saga/effects";

function* uploadImage(action) {
    console.log('in uploadImage saga Multer');
    console.log('image info payload is: ', action.payload[0]);
    let formData = new FormData();

    formData.append('uploaded_file', action.payload[0]);

    try {
        yield axios.put(`/api/upload`, formData, {
            headers: {
                headers: {"Content-Type": "multipart/form-data" },
            }
        });
        yield put({type: 'FETCH_ALL_IMAGES' });
    }
    catch(error) {
        console.log('error in Multer Saga', error);
    }
}

function* multerSaga(){
    yield takeLatest('UPLOAD_IMAGE', uploadImage); 
}

export default multerSaga;