import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsersList.css';

function AllUsersList() {
  const dispatch = useDispatch();
  const allUsersList = useSelector(store => store.allUsers);
  const user = useSelector((store) => store.user);
  const [userType, setUserType] = useState(0);
  console.log('waht is allUsersList',allUsersList);
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [])

  function goToProfile(evt) {
    history.push(`/AllUsersDetails/${evt.id}`)
  }

  return (
    <>
      <h1>All Users</h1>
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
              <button onClick={(evt) => { goToProfile(allUsers) }}>
                <span>{allUsers.fname} {allUsers.lname}</span>
              </button>
              {user.userType == 5 && (
                <>
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
              <p onClick={() => { goToProfile(allUsers) }}>
                <span>{allUsers.fname} {allUsers.lname}</span>
              </p>

              {user.userType == 5 && (
                <li>                  
                    {allUsers.username}
                  
                </li>
              )}
              {user.userType == 5 && (
                <Link to={`/allusers/${allUsers.id}/edit`}>
                  <button>Edit User</button>
                </Link>
              )}
              <hr></hr>

            </ul>
          ))}
        </div>
      )}
      <div>
        <button>Add New User</button>
      </div>
    </>
  );
}

export default AllUsersList;