import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ImageUpload() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState('');
    const user = useSelector((store) => store.user);

    const handleUpload = (event) => {
        event.preventDefault();
        console.log('in handleUpload ImageUpload', selectedFile);
        dispatch({
            type: `UPLOAD_IMAGE`,
            payload: selectedFile,
        });
        history.push('/homepage')
    }

    const changeHandler = (event) => {
        console.log('in changeHandler ImageUpload', event.target.files);
        setSelectedFile(event.target.files);
    }
    console.log('in ImageUpload ');
    return (
        <>
            <img
                src={user.profilePic}
                style={{
                    border: '1px solid black',
                    borderRadius: '50%',
                    height: '200px',
                    width: '200px'
                }}
            />
            <form 
                onSubmit={handleUpload} 
                action="/profile" 
                method="post" 
                encType="multipart/form-data"
            >
                <input
                    type="file"
                    className="form-control-file"
                    name="uploaded_file"
                    onChange={changeHandler}
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

export default ImageUpload;