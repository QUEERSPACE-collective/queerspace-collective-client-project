import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import './AllUsersDetails.css';
import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

function AllUsersDetails() {
  const allUsersList = useSelector(store => store.allUsers);
  const user = useSelector((store) => store.user);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("the user is", user);
  console.log("all the users are", allUsersList);

useEffect(() => {
  animater(), // Call fade effect, yes I know this is spelled wrong
  dispatch({ type: "FETCH_ALL_USERS" })
}, []);

//Fade effect
function animater() {
  document.body.classList.remove("noSalmon");
  document.body.classList.add("salmon");
  setTimeout(() => document.body.classList.remove("salmon"), 100);
  setTimeout(() => document.body.classList.add("noSalmon"), 100);
};
//Fade effect

const deleteUser = (id) => {
  console.log('in allUsersDetails deleteUser, the users id is', id)
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
        {allUsersList.map(allUsers => (
          (params.id == allUsers.id && (
            <ul key={allUsers.username} >
              <h2> {allUsers.fname} {allUsers.lname}</h2>
              {user.userType == 5 && (
                <div>
                  <li>
                    {allUsers.userType == 5 && (
                      <span>Admin</span>
                    )}
                    {allUsers.userType == 4 && (
                      <span>Mentor</span>
                    )}
                    {allUsers.userType == 3 && (
                      <span>Youth/Mentee</span>
                    )}
                    {allUsers.userType == 2 && (
                      <span>Caregiver</span>
                    )}
                    {allUsers.userType == 1 && (
                      <span>Volunteer</span>
                    )}
                  </li>
                  <li>
                    Pronouns: {allUsers.pronouns}
                  </li>
                  <li>
                    Email: {allUsers.username}
                  </li>
                  <li>
                    Bio: {allUsers.bio}
                  </li>
                  {allUsers.userType == 3 && (
                  <li>
                  Mentor: {allUsers.mentor_firstname} {allUsers.mentor_lastname}
                  </li>
                  )}
                  {allUsers.userType == 4 && (
                  <li>
                  Mentee: {allUsers.mentor_firstname} {allUsers.mentor_lastname}
                  </li>
                  )}
                  <li>
                    <Link to={`/allusers/${allUsers.id}/edit`} className='editUserBtn'>
                      <Button variant='contained'>Edit User</Button>
                    </Link>                  
                  </li>
                  <Button
                    variant="contained"
                    color="error"
                    value={allUsers.id}
                    onClick={(evt) => deleteUser(evt.target.value)}
                  >
                    Delete User
                  </Button>
                </div>
              )}
              
              {user.userType == 4 && (
                <div>
                  <li>
                    Pronouns: {allUsers.pronouns}
                  </li>
                  <li>
                    Email: {allUsers.username}
                  </li>
                  <li>
                    Bio: {allUsers.bio}
                  </li>
                </div>
              )}

              {user.userType < 4 && (
                <div>
                  <li>
                    Pronouns: {allUsers.pronouns}
                  </li>
                  <li>
                    Bio: {allUsers.bio}
                  )}
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