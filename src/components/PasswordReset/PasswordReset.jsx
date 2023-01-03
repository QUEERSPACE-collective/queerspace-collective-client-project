import { useParams, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


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