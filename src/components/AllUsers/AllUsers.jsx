import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsers.css';
import Button from '@mui/material/Button';
import Fuse from 'fuse.js'
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AllUsers() {
  const [query, setQuery] = useState(''); // For fuse.js search
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [theUser, setTheUser] = useState([]); // For fuse.js search
  const allUsers = useSelector(store => store.allUsers);
  const [userType, setUserType] = useState(0); // !* NOTE: userType is DIFFERENT than user.userType *!

  // For Fuse.js search
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

  useEffect(() => {
    pageFadeIn(),
      dispatch({ type: "FETCH_ALL_USERS" }),

      // axios used for fuse.js search functionality
      axios({
        method: 'GET',
        url: '/api/allusers'
      }).then((response) => {
        setTheUser(response.data);
      }).catch((err) => {
        console.log('Error in getting theUser', err);
      })
  }, [])

  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  };

  // Fuse.js search
  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  function goToProfile(evt) {
    history.push(`/UserDetails/${evt.id}`)
  }

  return (
    <div id='AllUsersPageContainer'>
    
      <h1 className='bannerTop'>All Users</h1>
      <form className='allusersForm'>
        <FormControl className='formControl'>
          <Select
            sx={{ height: '30px', marginTop: '3px', marginRight: '25px', outline: 'none', border: '1px solid black' }}
            id="demo-simple-select"
            value={userType}
            onChange={(evt) => setUserType(evt.target.value)}
            className='allusersSelect'
          >
            <MenuItem value={0}>All Users</MenuItem>
            <MenuItem value={1}>Volunteers</MenuItem>
            <MenuItem value={2}>Caregivers</MenuItem>
            <MenuItem value={3}>Mentees/Youth</MenuItem>
            <MenuItem value={4}>Mentors</MenuItem>
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
        <br/>
    {user.userType == 5 && (
        <Button
        variant='contained' sx = {{bgcolor: '#f39536', fontWeight: 'bold', wordSpacing: 1, mt: 2,                
        '&:hover': {
        backgroundColor: '#f39536',
        boxShadow: '6px 6px 0px #e2bf05'
        },}}
        onClick = {() => history.push('/adduserform')}
        >
          Add New User
        </Button>
    )}
      </form>
      
    {/* Fuse.js conditional rendering  ⬇️ */}
    {results.length > 0 && (
      <div className='allusersContainer'>
        {userResults.map(allUsers => (
          <ul key={allUsers.username} className='allusersP allusersContainer'>
            <p onClick={(evt) => { goToProfile(allUsers) }} >
              <Button 
                className='clickableName' 
                size="small" 
                sx={{ borderRadius: '10px', fontSize: 16, fontWeight: 'bold'}}
              >
                {allUsers.fname} {allUsers.lname}
              </Button>
            </p>

              {user.userType == 5 && (
                  <Button 
                  onClick={() => history.push(`/allusers/${allUsers.id}/edit`)}
                  variant='contained'
                  sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                  '&:hover': {
                  backgroundColor: '#357590',
                  boxShadow: '6px 6px 0px #90c5bf'
                  },}}
                  >
                    <EditIcon/>
                  </Button>
              )}
              {user.userType < 5 && (
                <span></span>
              )}
            </ul>
          ))}
        </div>
      )}

    {/* Conditional render based off what the filter value is: 
        (0,1,2,3,4,5 : 'All Users,Mentees,Mentors,Volunteers,Caregivers,Admin' )) ⬇️ */}
    <div className='allusersContainer'>
      {allUsers.map(allUsers => (
        (userType > 0 && userType == allUsers.userType && results.length < 1) && (
          // This says- "if the filter is not set to 'All Users (0)', map through every user and find 
          // the ones where their TYPE value is the same as the 
          // current filter value, as long as fuzzy search isn't being used"
          <ul key={allUsers.username} className='allusersP allusersContainer'>
            <p onClick={(evt) => { goToProfile(allUsers) }}>
              <Button 
                className='clickableName' 
                size="small" 
                sx={{ borderRadius: '10px', fontSize: 16, fontWeight: 'bold'}}
              >
                {allUsers.fname} {allUsers.lname}
              </Button>
            </p>

              {user.userType < 5 && (
                <span></span>
              )}
              {/* if the above conditional is true, AND the current logged in user is an admin, 
                  then also show the "Edit User" Button/Link */}
              {user.userType == 5 && (
                  <Button 
                      onClick={() => history.push(`/allusers/${allUsers.id}/edit`)}
                      variant='contained'
                      sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                      '&:hover': {
                      backgroundColor: '#357590',
                      boxShadow: '6px 6px 0px #90c5bf'
                      },}}
                      >
                        <EditIcon/>
                      </Button>
              )}
            </ul>
          )
        ))}
      </div>

      {/* if the filter value is set to 0 (All Users), show the entire list of users 
        as long as fuzzy search isn't being used ⬇️ */}
      {(userType == 0 && results.length < 1) && (
        <div className='allusersHover'>
          {allUsers.map(allUsers => (
            <ul key={allUsers.username} className='allusersContainer'>
              <p onClick={() => { goToProfile(allUsers) }} className='allusersP'>
                <Button 
                  className='clickableName' 
                  size="small" 
                  sx={{ borderRadius: '10px', fontSize: 16, fontWeight: 'bold'}}
                >
                  {allUsers.fname} {allUsers.lname}
                </Button>
              </p>
              {/* Same as above, if the latest conditions are true AND the currently logged in 
                  user is an admin, show the link */}
              {user.userType == 5 && (
                  <Button variant='contained' size = "small"
                  onClick={() => history.push(`/allusers/${allUsers.id}/edit`)}
                  sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                '&:hover': {
                backgroundColor: '#357590',
                boxShadow: '6px 6px 0px #90c5bf'
                },}}
                  >
                    <EditIcon/>
                  </Button>
              )}
              <br></br>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllUsers;