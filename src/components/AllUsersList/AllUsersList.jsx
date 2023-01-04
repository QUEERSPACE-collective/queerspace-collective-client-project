import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsersList.css';
import Button from '@mui/material/Button';
import Fuse from 'fuse.js'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AllUsersList() {
  const [query, setQuery] = useState(''); // For fuse.js search
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [theUser, setTheUser] = useState([]); // For fuse.js search
  const allUsersList = useSelector(store => store.allUsers);
  const [userType, setUserType] = useState(0); // !* NOTE: userType is DIFFERENT than user.userType *!

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
    animater(),
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
  //Fade effect
  function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
  };
  //Fade effect

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
      <h1 className='bannerTop'>List of All Users</h1>
      <form className='allusersForm'>
       <FormControl className='formControl'>
        <Select
          sx={{height:'20px',marginTop:'3px',marginRight:'25px',outline:'none',border:'1px solid black'}}
          id="demo-simple-select" 
          value={userType}
          onChange={(evt) => setUserType(evt.target.value)}
          className='allusersSelect'
        >
          <MenuItem value={0}>All Users</MenuItem>
          <MenuItem value={3}>Mentees/Youth</MenuItem>
          <MenuItem value={4}>Mentors</MenuItem>
          <MenuItem value={1}>Volunteers</MenuItem>
          <MenuItem value={2}>Caregivers</MenuItem>
          <MenuItem value={5}>Admin</MenuItem>
        </Select>
      </FormControl>

        {/* input for fuse.js */}
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

    {/* Conditional render based off what the filter value is: 
        (0,1,2,3,4,5 : 'All Users,Mentees,Mentors,Volunteers,Caregivers,Admin' )) ⬇️ */}
    <div className='allusersContainer'>
      {allUsersList.map(allUsers => (
        (userType > 0 && userType == allUsers.userType && results.length < 1) && (
          // This says- "if the filter is not set to 'All Users (0)', map through every user and find 
          // the ones where their TYPE value is the same as the 
          // current filter value, as long as fuzzy search isn't being used"
          <ul key={allUsers.username} className='allusersP allusersContainer'>
            <p onClick={(evt) => { goToProfile(allUsers) }}>
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
              {/* if the above conditional is true, AND the current logged in user is an admin, 
                  then also show the "Edit User" Button/Link */}
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
        as long as fuzzy search isn't being used ⬇️ */}
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
              {/* Same as above, if the latest conditions are true AND the currently logged in 
                  user is an admin, show the link */}
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

    {user.userType == 5 && (
      <div>
        <Link to={'/adduserform'}>
        <button>Add New User</button>
        </Link>
      </div> 
    )}
   
    </>
  );
}

export default AllUsersList;