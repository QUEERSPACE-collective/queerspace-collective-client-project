import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsersList.css';
import Button from '@mui/material/Button';
import Fuse from 'fuse.js'
import axios from 'axios';

function AllUsersList() {
  const [query, setQuery] = useState(''); // For fuse.js search
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [theUser, setTheUser] = useState([]); // For fuse.js search
  const allUsersList = useSelector(store => store.allUsers);
  const [userType, setUserType] = useState(0); // !* userType is DIFFERENT than user.userType *!

  // Code for Fuse.js search ⬇️
  const fuse = new Fuse(theUser, {
    keys: [
      'fname'
    ],
    includeScore: true
  })
  const results = fuse.search(query);
  console.log(results, 'results are');
  console.log('fuse', fuse);
  const userResults = results.map(result => result.item);
  // Code for Fuse.js search ⬆️

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" }),

      // axios needed for fuse.js search functionality
      axios({
        method: 'GET',
        url: '/api/allusers'
      }).then((response) => {
        setTheUser(response.data);
      }).catch((err) => {
        console.log('Error in getting theUser');
      })

  }, [])

  // Fuse.js search ⬇️
  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }
  // Fuse.js search ⬆️

  function goToProfile(evt) {
    history.push(`/AllUsersDetails/${evt.id}`)
  }

  return (
    <>
      <h1>All Users</h1>
      <form className='allusersForm'>
        <select onChange={(evt) => setUserType(evt.target.value)}
          value={userType}
          className='allusersSelect'
        >
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

{/* this input here is used for fuse.js */}
        <input
          type="text"
          autoComplete='off'
          id="myInput"
          value={query}
          onChange={handleOnSearch}
          className='searchInput'
          placeholder="Search Specific User"
        >
        </input>
      </form>

      {/* Fuse.js conditional rendering  ⬇️ */}
      {results.length > 0 && (
        <div className='allusersContainer'>
          {userResults.map(allUsers => (
            <ul key={allUsers.username} className='allusersP allusersContainer'>
              <p onClick={(evt) => { goToProfile(allUsers) }} >
                <Button 
                  className='clickableName' 
                  variant='outlined' 
                  size="small" 
                  sx={{ borderRadius: '10px' }}
                >
                  {allUsers.fname} {allUsers.lname}
                </Button>
              </p>
              {user.userType == 5 && (
                <Link to={`/allusers/${allUsers.id}/edit`} className='editUserBtn'>
                  <Button variant='contained'>Edit User</Button>
                </Link>
              )}
              {user.userType < 5 && (
                <br></br>
              )}
            </ul>
          ))}
        </div>
      )}
      {/* Fuse.js conditonal rendering ⬆️ */}

      {/* Conditional render based off what the filter value is: (0,1,2,3,4,5 : 'All Users,Mentees,Mentors,Volunteers,Caregivers,Admin' )) ⬇️*/}
      <div className='allusersContainer'>
        {allUsersList.map(allUsers => (
          (userType > 0 && userType == allUsers.userType && results.length < 1) && (
// This says- "if the filter is not set to 'All Users', map through every user and find the ones where their TYPE value is the same as the filter value,
// as long as the fuzzy search results length is not being used"
            <ul key={allUsers.username} className='allusersP allusersContainer'>
              <p onClick={(evt) => { goToProfile(allUsers) }} >
                <Button 
                  className='clickableName' 
                  variant='outlined' 
                  size="small" 
                  sx={{ borderRadius: '10px' }}
                >
                  {allUsers.fname} {allUsers.lname}
                </Button>
              </p>
              {user.userType < 5 && (
                <br></br>
              )}
{/* if the above conditional is true, AND the current logged in user is an admin, then also show the Edit User Button/Link */}
              {user.userType == 5 && (
                <Link to={`/allusers/${allUsers.id}/edit`} className='editUserBtn'>
                  <Button variant='contained'>Edit User</Button>
                </Link>
              )}
            </ul>
          )
        ))}
      </div>

      {/* if the filter value is set to 0 (All Users), show the entire list of users 
        as long as fuzzy search isn't being used ⬇️*/}
      {(userType == 0 && results.length < 1) && (
        <div className='allusersHover'>
          {allUsersList.map(allUsers => (
            <ul key={allUsers.username} className='allusersContainer'>
              <p onClick={() => { goToProfile(allUsers) }} className='allusersP'>
                <Button 
                  className='clickableName' 
                  variant='outlined' 
                  size="small" 
                  sx={{ borderRadius: '10px' }}
                >
                  {allUsers.fname} {allUsers.lname}
                </Button>
              </p>
{/* Same as above, if the latest conditions are true AND the currently logged in user is an admin, show the link */}
              {user.userType == 5 && (
                <Link to={`/allusers/${allUsers.id}/edit`} className='editUserBtn'>
                  <Button variant='contained'>Edit User</Button>
                </Link>
              )}
              <br></br>
            </ul>
          ))}
        </div>
      )}
{/* Maia was working on add new user button I believe, so I won't mess with it for now.
  It will regardless need to be added to the Admin views up above. */}
      <div>
        <button>Add New User</button>
      </div>
    </>
  );
}

export default AllUsersList;