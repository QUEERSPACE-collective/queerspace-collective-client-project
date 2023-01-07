import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import './UserDetails.css';
import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

function UserDetails() {
  const allUsers = useSelector(store => store.allUsers);
  const user = useSelector((store) => store.user);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("the user is", user);
  console.log("all the users are", allUsers);

useEffect(() => {
  pageFadeIn(), 
  dispatch({ type: "FETCH_ALL_USERS" })
}, []);

//Fade effect
function pageFadeIn() {
  document.body.classList.remove("withOpacity");
  document.body.classList.add("noOpacity");
  setTimeout(() => document.body.classList.remove("noOpacity"), 100);
  setTimeout(() => document.body.classList.add("withOpacity"), 100);
};

const deleteUser = (id) => {
  console.log('in AllUsers deleteUser, the users id is', id)
  dispatch({
    type: "DELETE_USER",
    payload: id,
  });
  history.push('/allusers')
}

  return (
    <>
      {/* Just a placeholder, I think it'd be cool to incorporate their styling as much as possible though. */}
      <div className='bannerTop'></div> 
      <section className='alluserDetailsContainer'>
        {allUsers.map(all => (
          (params.id == all.id && (
            <ul key={all.username} >
              <h2> {all.fname} {all.lname}</h2>
              {user.userType == 5 && (
                <div>
                  <li>
                    {all.userType == 5 && (
                      <span>Admin</span>
                    )}
                    {all.userType == 4 && (
                      <span>Mentor</span>
                    )}
                    {all.userType == 3 && (
                      <span>Youth/Mentee</span>
                    )}
                    {all.userType == 2 && (
                      <span>Caregiver</span>
                    )}
                    {all.userType == 1 && (
                      <span>Volunteer</span>
                    )}
                  </li>
                  <li>
                    Pronouns: {all.pronouns}
                  </li>
                  <li>
                    Email: {all.username}
                  </li>
                  <li>
                    Bio: {all.bio}
                  </li>
                  {all.userType == 3 && (
                  <li>
                  Mentor: {all.mentor_firstname} {all.mentor_lastname}
                  </li>
                  )}
                  {all.userType == 4 && (
                  <li>
                  Mentee: {all.mentor_firstname} {all.mentor_lastname}
                  </li>
                  )}
                  <li>
                    <Link to={`/allusers/${all.id}/edit`} className='editUserBtn'>
                      <Button variant='contained'>Edit User</Button>
                    </Link>                  
                  </li>
                  <Button
                    variant="contained"
                    color="error"
                    value={all.id}
                    onClick={(evt) => deleteUser(evt.target.value)}
                  >
                    Delete User
                  </Button>
                </div>
              )}
              
              {user.userType == 4 && (
                <div>
                  <li>
                    Pronouns: {all.pronouns}
                  </li>
                  <li>
                    Email: {all.username}
                  </li>
                  <li>
                    Bio: {all.bio}
                  </li>
                </div>
              )}

              {user.userType < 4 && (
                <div>
                  <li>
                    Pronouns: {all.pronouns}
                  </li>
                  <li>
                    Bio: {all.bio}
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

export default UserDetails;