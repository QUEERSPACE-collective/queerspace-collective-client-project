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
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [params.id])

  return (

    <div>
      <h1>User profile when searched by another user</h1>

      {/* Here I will display just the user's ID that is in the URL link. I will start by showing the admin's view? Then what others will see */}
      {allUsersList.map(allUsers => (

        <ul key={allUsers.username}>

          <span onClick={() => { goToProfile(allUsers) }}>{allUsers.username}</span>

          <li>{allUsers.fname} {allUsers.lname} {allUsers.pronouns}</li>

          <hr></hr>
        
        </ul>

      ))}

    </div>

  );
}

export default AllUsersDetails;