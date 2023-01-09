import { useParams, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import './PasswordReset.css';

function PasswordReset() {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  console.log(params.token);
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: "RESET_PASSWORD",
      payload: {
        password: password,
        token: params.token
      }
    });
    history.push('/login');
  }
    return (
      <div>
        <form className="resetform" onSubmit={handleSubmit}>
          <div>
          <h1>Reset Password</h1>
          </div>
          <div>
            <h4>Enter in new password to reset and hit "Reset Password" button</h4>
          </div>
          <label>
            <input
              placeholder="Password"
              className="pwresetinput"
              name="password"
              type="password"
              value={password}
              required
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </label>
          <Button type="submit"
            sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
            '&:hover': {
            backgroundColor: '#357590',
            boxShadow: '6px 6px 0px #90c5bf'
            },}}
          >
            Reset password
          </Button>
        </form>
      </div>
    );

}

export default PasswordReset;