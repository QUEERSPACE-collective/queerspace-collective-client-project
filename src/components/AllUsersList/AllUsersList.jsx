import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsersList.css';

// CUSTOM COMPONENTS

// On page load, GET all users
// CHRIS WILL CONTINUE TO WORK ON THIS, WILL BE CONNECTED AMONG THE AllUsersDetails and the AllUserListItems
// This edit page for alluserslist will on be for admins.
function AllUsersList() {
  const dispatch = useDispatch();
  const allUsersList = useSelector(store => store.allUsers);
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [])

function goToAddUser() {
  history.push('/AddUserForm')
}
  return (
    <div>
      <h1>AllUsersList</h1>
      <div>
        {allUsersList.map(allUsers => (
          <ul>
            <li key={allUsers.username}>{allUsers.username}</li>
              <ul>
                <li>{allUsers.fname} {allUsers.lname} {allUsers.pronouns}</li>
                <hr></hr>
                <Link to={`/allusers/${allUsers.id}/edit`}>
                <button>Edit User</button>
                </Link>
              </ul>
          </ul>
        ))}
      
      <div>
        <button onClick={goToAddUser}>Add New User</button>
      </div>
      
      </div>

    </div>
    
  );
}

export default AllUsersList;