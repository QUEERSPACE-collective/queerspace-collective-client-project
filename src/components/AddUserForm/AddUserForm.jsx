import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AddUserForm.css';

function AddUserForm() {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState(0);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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
    <form onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Email:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='userType'>
          Access Level: 
        </label>
        <select onChange={(event) => setUserType(event.target.value)} value={userType}>
          <option>Select One</option>
          <option value="1">
            Mentee/Youth
          </option>
          <option value="2">
            Mentor
          </option>
          <option value="3">
            Volunteer
          </option>
          <option value="4">
            Caregiver
          </option>
          <option value="5">
            Admin
          </option>
        </select>
      </div>
      <div>
        <input type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default AddUserForm;
