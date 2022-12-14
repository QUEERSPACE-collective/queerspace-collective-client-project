import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [userType, setUserType] = useState(0);
  const [pronouns, setPronouns] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        fname: fname,
        lname: lname,
        userType: userType,
        pronouns: pronouns,
        profilePic: profilePic,
        bio: bio,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          *Username:
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
        <label htmlFor="password">
          *Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='fname'>
          First Name:
          <input
            type="text"
            name="first name"
            value={fname}
            onChange={(event) => setFname(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='lname'>
          Last Name:
          <input
            type="text"
            name='last name'
            value={lname}
            onChange={(event) => setLname(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='userType'>
          What kind of user are you?: 
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
        </select>
      </div>
      <div>
        <label htmlFor='pronouns'>
          Pronouns: 
          <input
            type="text"
            name='pronouns'
            value={pronouns}
            onChange={(event) => setPronouns(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='profilePic'>
          Profile Picture: 
          <input
            type="text"
            name="profile picture"
            value={profilePic}
            onChange={(event) => setProfilePic(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor='bio'>
          Bio: 
          <input
            type="text"
            name='bio'
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
