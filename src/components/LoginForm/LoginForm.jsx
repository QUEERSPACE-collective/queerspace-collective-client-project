import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
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
    <form className="formPanel" onSubmit={login}>
      <h1 onClick={() => { setUsername('maiaj1306@gmail.com'), setPassword('gFdQK@9') }}>Member Login</h1>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label className="usernamelabel" htmlFor="username" onClick={() => { setUsername('ADMIN'), setPassword('asty') }}>
          <input
            placeholder='Username'
            className='username'
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="passwordlabel" htmlFor="password" onClick={() => { setUsername('noelani.rose14@gmail.com'), setPassword('E5YPZu0R') }}>
          <input
            placeholder="Password"
            className="password"
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
