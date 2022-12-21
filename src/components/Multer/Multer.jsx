import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

function Upload() {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState('');
    const handleUpload = (event) => {
        event.preventDefault();
        console.log('in handleUpload Multer');

        dispatch({
            type: `UPLOAD_IMAGE`,
            payload: selectedFile,
        })
    }

    const changeHandler = (event) => {
        console.log('in changeHandler Multer');
        setSelectedFile(event.target.files);
    }
    console.log('in upload Multer');
    return (
        <>
        <img src={selectedFile} style={{border:'1px solid black',borderRadius:'50%', height:'200px', width:'200px'}}/>
        <form onSubmit={handleUpload} action="/profile" method="post" enctype="multipart/form-data">
            <input 
                type="file" 
                className="form-control-file" 
                name="uploaded_file"
                onChange={changeHandler}
            />
            <input 
                type="text"
                className="form-control" 
                placeholder="description"
                name="description"
            />
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