import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();
    // compares the given username and password to the stored username and password, if they match it logs in the user, if not then it pops up an error
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    // Gathers username and password, then sends it to the database to compare and log in the user
    <form className="formPanel" onSubmit={login}>
      <h1>User Login</h1>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label className="usernamelabel" htmlFor="username">
          <input
            placeholder='Username'
            className='usernameinput'
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="passwordlabel" htmlFor="password">
          <input
            placeholder="Password"
            className="passwordinput"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
      {/* Sends the user to the forgot page on click */}
      <div>
          <Button 
          onClick={() => history.push('/forgot')}
          sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
          '&:hover': {
          backgroundColor: '#357590',
          boxShadow: '6px 6px 0px #90c5bf'
          },}}
          >
            Forgot Password?
          </Button>
      </div>
    </form>
  );
}

export default LoginForm;
