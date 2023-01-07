import React from 'react';
import Upload from '../ImageUpload/ImageUpload';
import { useEffect, useState } from "react";

function EditProfilePicture() {
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
      <h1>Edit Profile Picture</h1>
      <Upload />
    </div>
  );
};

export default EditProfilePicture;