import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './AllUsersDetails.css';

// CUSTOM COMPONENTS
// CHRIS WILL WORK ON THIS

//This page will show the user's profile, depending upon which one was clicked on. Will need to use params
function AllUsersDetails() {
  const allUsersList = useSelector(store => store.allUsers);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const params = useParams();
  
  useEffect(() => {
    console.log('in useEffect in allusersdetails.jsx',);
    dispatch({
      type: "SHOW_ONE_USER",
      payload: 
        params.id
    });

   
  }, [params.id])

  return (

    <div>
      <h1>User profile when searched by another user</h1>

     

    </div>

  );
}

export default AllUsersDetails;