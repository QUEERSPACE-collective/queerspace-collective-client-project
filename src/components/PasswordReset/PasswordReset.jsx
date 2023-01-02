import { useParams, useHistory, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function PasswordReset() {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    console.log(params.id);
    const allUsersList = useSelector(store => store.allUsers)

    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_USERS",
            payload: params.id
        })
    }, [params.id]);

    for (let user of allUsersList) {
        if (user.username === params.id) {
            // handleSubmit();
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_PASSWORD"
        });
        history.push('/login')
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Password
            <input
              name="password"
              type="password"
            />
          </label>
          <label>
            Re-type password
            <input
              name="passwordVerify"
              type="password"
            />
          </label>
          <button type="submit">Reset password</button>
        </form>
      </div>
    );

}

  
export default PasswordReset;