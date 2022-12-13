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
<>
    <div>
      <h1>User: {allUsersList.fname} {allUsersList.lname} </h1>
    {user.userType ==5 && (
      <>
     <h1>{allUsersList.username}</h1>
      
       <p>{allUsersList.mentorPair} </p>
      </>
     )}

     <h1>{allUsersList.profilePic}</h1>
     <h1>{allUsersList.pronouns}</h1>
     <h1>{allUsersList.bio}</h1>
      {user.userType == 5 && (

<button>Edit Profile</button>

      )}
    </div>
</>
  );
}

export default AllUsersDetails;