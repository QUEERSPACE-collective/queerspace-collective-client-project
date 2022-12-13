import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsersList.css';

// On page load, GET all users

// This edit page for alluserslist will only be for admins.

function AllUsersList() {
  const user = useSelector((store) => store.user); 
  const allUsersList = useSelector(store => store.allUsers);

  const [userType, setUserType] = useState(1);

  const dispatch = useDispatch();
 

  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [])

  function goToAddUser() {
  history.push('/AddUserForm')
}
//----------
function filterType(evt) {
  evt.preventDefault();

}
  return (
    <>
      <h1>AllUsersList</h1>
      <form onSubmit={(evt) => filterType(evt)} value={userType}>
      <select onChange={(evt) => setUserType(evt.target.value)} value={userType}>
        <option disabled selected hidden>Filter</option>
        <option value="1">
          All Users
        </option>
        <option value="2">
          Youth
        </option>
        <option value="3">
          Mentors
        </option>
        <option value="4">
          Volunteers
        </option>
        <option value="5">
          Caregivers
        </option>
      </select>
      <button type="submit">Search</button>
    </form>
    
    
      <div>
        {allUsersList.map(allUsers => (
           (userType == allUsers.userType) && (
          <ul key={allUsers.username}>
                  {allUsers.username}   
                <li>{allUsers.fname} {allUsers.lname} {allUsers.pronouns}</li>
                <hr></hr>
                <Link to={`/allusers/${allUsers.id}/edit`}>
                <button>Edit User</button>
                </Link> 
          </ul>
          )
        ))}

        
      <div>
        <button onClick={goToAddUser}>Add New User</button>
      </div>
      
      </div>
      

    </>
    
  );
}

export default AllUsersList;