import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsersList.css';

// On page load, GET all users

// Also, all users should be able to click on their name and go to that profile.
// Maybe display the total # of users depending on the type of filter applied.

function AllUsersList() {
  const allUsersList = useSelector(store => store.allUsers);
  const user = useSelector((store) => store.user);
  const [userType, setUserType] = useState(0);

  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [])

  //------------------
function goToProfile(evt) {
  // evt.preventDefault();
  console.log('event id issssssss',evt.id)
 
  history.push(`/AllUsersDetails/${evt.id}`)
 
  // Now that we have the user's id on click, we need to use it to send us to the user's profile page that has that ID
}

  //------------------

  return (
    <>
      <h1>AllUsersList</h1>
      <form>
        <select onChange={(evt) => setUserType(evt.target.value)} value={userType}>
          <option disabled selected hidden>Filter</option>
          <option value="0">
            All Users
          </option>
          <option value="1">
            Mentees/Youth
          </option>
          <option value="2">
            Mentors
          </option>
          <option value="3">
            Volunteers
          </option>
          <option value="4">
            Caregivers
          </option>
          <option value="5">
            Admin
          </option>
        </select>
      </form>
      {/* Render conditionally based off what the filter value is ⬇️*/}
      <div>



        {allUsersList.map(allUsers => (
          (userType > 0 && userType == allUsers.userType) && (
            <ul key={allUsers.username}>
              Name:
              <button onClick={()=> {goToProfile(allUsers)}}>
              <span>{allUsers.fname} {allUsers.lname}</span>
              </button>
              {user.userType == 5 && (
               <>
              {/* <li>  {allUsers.pronouns}</li> */}
              <li>Email: {allUsers.username}</li>
              </>
              )}
              <hr></hr>
              {user.userType == 5 && (
              <Link to={`/allusers/${allUsers.id}/edit`}>
                <button>Edit User</button>
              </Link>
              )}
            </ul>
          )
        ))}

      </div>

      {/* if userType value is 0, render the whole user list as normal ⬇️*/}

      {(userType == 0) && (
      <div>
        {allUsersList.map(allUsers => (
          
            <ul key={allUsers.username}>
              Name:
              <button onClick={()=> {goToProfile(allUsers)}}>
              <span>{allUsers.fname} {allUsers.lname}</span>
              </button>

              {user.userType == 5 && (
                
              <li> 
                
                {/* <li>  {allUsers.pronouns}</li> */}
              
                <li>
                {allUsers.username}
                </li>
                </li>
              )}
              <hr></hr>
              {user.userType == 5 && (
              <Link to={`/allusers/${allUsers.id}/edit`}>
                <button>Edit User</button>
              </Link>
              )}
                        
            </ul>
          ))}
      </div>   
      )}
      <div>
        <Link to={'/adduserform'}>
        <button>Add New User</button>
        </Link>
      </div>
    </>
  );
}

export default AllUsersList;