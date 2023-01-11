import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Card, Box } from '@mui/material';
import './AddUserForm.css';
//AddUserForm.jsx is Admin view only
function AddUserForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState(0);
  const errors = useSelector((store) => store.errors);
  const allUsers = useSelector((store) => store.allUsers)

  useEffect(() => {
    pageFadeIn(),
      dispatch({ type: "FETCH_ALL_USERS" })
  }, [])

  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  };

  // Disable add user button if username is already in system
  const isDisabled = () => {
    {
      allUsers.map(user => {
        (username == user.username)
      })
    }
  }

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        userType: userType,
      },
    });
  }; // end registerUser

  return (
    <form className="adduserform" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Card sx={{
        bgcolor: '#f8f8f9',
        width: '40%',
        pb: 10,
        pt: 5
      }}>
        <div>
          <label
            className="adduserlabel"
            htmlFor="username"
            onClick={() => { setUsername('noelani.rose14@gmail.com') }}
          >
            *Email Address:
          </label>
          <input
            className='adduserinput'
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label 
            className="accesslevellabel" 
            htmlFor='userType'
          >
            *Access Level:
          </label>
          <select 
            className='adduserinput' 
            onChange={(event) => setUserType(event.target.value)} 
            value={userType}
          >
            <option>Select One</option>
            <option value="1">
              Volunteer
            </option>
            <option value="2">
              Caregiver
            </option>
            <option value="3">
              Mentee/Youth
            </option>
            <option value="4">
              Mentor
            </option>
            <option value="5">
              Admin
            </option>
          </select>
        </div>
      </Card>
      <div>
        <Button
          disabled={isDisabled()}
          value="Register"
          name="submit"
          type="submit"
          className="regbtn"
          variant='contained' sx={{
            bgcolor: '#f39536', 
            fontWeight: 'bold', 
            wordSpacing: 1, 
            mt: 2,
            '&:hover': {
              backgroundColor: '#f39536',
              boxShadow: '6px 6px 0px #e2bf05'
            },
          }}
        >
          Register New User
        </Button>
      </div>
    </form>
  );
}

export default AddUserForm;