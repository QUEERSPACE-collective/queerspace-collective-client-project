import React from 'react';
import Upload from '../ImageUpload/ImageUpload';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function EditProfilePicture() {
  const history = useHistory();
  useEffect(() => {
    pageFadeIn()
  }, []);

  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  };
  return (
    <div>
        <Button 
          onClick = {() => history.push('/homepage')}
          sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590',                
          '&:hover': {
          fontSize: 16
          },}}
          size="small">
              <ArrowCircleLeftIcon/> Home
        </Button>
      <h1>Edit Profile Picture</h1>
      <Upload />
    </div>
  );
};

export default EditProfilePicture;