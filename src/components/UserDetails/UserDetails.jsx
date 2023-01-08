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
  const activeUser = useSelector(store => store.editUser);
  const user = useSelector((store) => store.user);
  const params = useParams();
  console.log(params.id)
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("the user is", user);
  console.log("all the users are", activeUser);

useEffect(() => {
  pageFadeIn(), // Call fade effect, yes I know this is spelled wrong
  dispatch({ 
    type: "FETCH_EDIT_USER",
    payload: params.id
 })
}, [params.id]);

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
       
            <ul>
              <h2> {activeUser.fname} {activeUser.lname}</h2>
              {user.userType == 5 && (
                <div>
                  <li>            
                    {activeUser.userType == 5 && (
                      <span>Admin</span>
                    )}
                    {activeUser.userType == 4 && (
                      <span>Mentor</span>
                    )}
                    {activeUser.userType == 3 && (
                      <span>Youth/Mentee</span>
                    )}
                    {activeUser.userType == 2 && (
                      <span>Caregiver</span>
                    )}
                    {activeUser.userType == 1 && (
                      <span>Volunteer</span>
                    )}
                  </li>
                  <li>
                    Pronouns: {activeUser.pronouns}
                  </li>
                  <li>
                    Email: {activeUser.username}
                  </li>
                  <li>
                    Bio: {activeUser.bio}
                  </li>
                  {activeUser.userType == 3 && (
                  <li>
                  Mentor: {activeUser.mentor_firstname} {activeUser.mentor_lastname}
                  </li>
                  )}
                  {activeUser.userType == 4 && (
                  <li>
                  Mentee: {activeUser.mentor_firstname} {activeUser.mentor_lastname}
                  </li>
                  )}
                  <li>
                    <Link to={`/allusers/${activeUser.id}/edit`} className='editUserBtn'>
                      <Button variant='contained'>Edit User</Button>
                    </Link>                  
                  </li>
                  <Button
                    variant="contained"
                    color="error"
                    value={activeUser.id}
                    onClick={(evt) => deleteUser(evt.target.value)}
                  >
                    Delete User
                  </Button>
                </div>
              )}
              
              {user.userType == 4 && (
                <div>
                  <li>
                    Pronouns: {activeUser.pronouns}
                  </li>
                  <li>
                    Email: {activeUser.username}
                  </li>
                  <li>
                    Bio: {activeUser.bio}
                  </li>
                </div>
              )}

              {user.userType < 4 && (
                <div>
                  <li>
                    Pronouns: {activeUser.pronouns}
                  </li>
                  <li>
                    Bio: {activeUser.bio}
                  </li>
                </div>
              )}
            </ul>
        <Link to="/allusers">
          <Button>Back To Events List</Button>
        </Link>
      </section>
    </>
  );
}

export default UserDetails;