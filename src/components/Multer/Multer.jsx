import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Upload() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState('');
    const user = useSelector((store) => store.user);
    const multerReducer = useSelector((store) => store.multerReducer);

    const handleUpload = (event) => {
        event.preventDefault();
        console.log('in handleUpload Multer',selectedFile);
        dispatch({
            type: `UPLOAD_IMAGE`,
            payload: selectedFile,
        });
        history.push('/profilepage')
    }

    const changeHandler = (event) => {
        console.log('in changeHandler Multer',event.target.files);
        setSelectedFile(event.target.files);
    }
    console.log('in upload Multer');
    return (
        <>           
        <img src={user.profilePic} style={{border:'1px solid black',borderRadius:'50%', height:'200px', width:'200px'}}/>
        <form onSubmit={handleUpload} action="/profile" method="post" encType="multipart/form-data">
            <input 
                type="file" 
                className="form-control-file" 
                name="uploaded_file"
                onChange={changeHandler}
            />
            {/* <input 
                type="text"
                className="form-control" 
                placeholder="description"
                name="description"
            /> */}
            <input
                type="submit"
                value="Upload"
                className="btn btn-default"
            />
        </form>
        </>
    )
}

export default Upload;