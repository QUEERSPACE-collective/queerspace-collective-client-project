import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import './AllUsersDetails.css';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

function AllUsersDetails() {
  const allUsersList = useSelector(store => store.allUsers);
  const user = useSelector((store) => store.user);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [])

  const deleteUser = (id) => {
    console.log('in delete item function onclick, id is', id)
      dispatch({
        type: "DELETE_USER",
        payload: id,
      });
      history.push('/allusers')
    }

  return (
    <>
    <section className='alluserDetailsContainer'>
      {allUsersList.map(allUsers => (
        (params.id == allUsers.id && (
          <ul key={allUsers.username} >
            <h2 > {allUsers.fname} {allUsers.lname}</h2>
            {user.userType == 5 && (
              
              <div>

                <li>
                  <p>Edit User</p>
                  <select>
                    <option disabled selected hidden>Type</option>
                    <option>Mentor</option>
                    <option>Mentee</option>
                    <option>Caregiver</option>
                    <option>Volunteer</option>
                  </select>
                </li>
                <li>
                  Pronouns: {allUsers.pronouns}
                </li>
                <li>
                  Email: {allUsers.username}
                </li>
                <li>
                  <button>Edit Profile</button>
                </li>
                <li>
                  Bio: {allUsers.bio}
                </li>
                <li>
                  Mentor: {allUsers.mentor}
                </li>

                <Button 
                variant="contained"
                color="error"
                value={allUsers.id}
                onClick={(evt) => deleteUser(evt.target.value)}
              > 
                Delete
              </Button>
              </div>             
            )}

              {user.userType < 5 && (
              <div >
                
                <li>
                  Pronouns: {allUsers.pronouns}
                </li>
                <li>
                  Bio: {allUsers.bio}
                </li>
                <li>
                  Mentor: {allUsers.mentor}
                </li>
              </div>
            )}
          </ul> 
        ))
      ))}
 <Link to="/allusers">
                <Button>Back To Events List</Button>
            </Link>
    </section>
    </>
  );
}

export default AllUsersDetails;