import { useParams, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

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
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            required
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </label>
        <button type="submit">Reset password</button>
      </form>
    </div>
  );
}

export default PasswordReset;