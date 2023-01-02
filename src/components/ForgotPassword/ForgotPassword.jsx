import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const history = useHistory();
    const allUsersList = useSelector(store => store.allUsers);

    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_USERS"
        });
    }, [])

    const sendEmail = (evt) => {
        evt.preventDefault();
        for (let user of allUsersList) {
            if (user.username = username) {
        }
        dispatch({
            type: "SEND_RESET_EMAIL",
            payload: {
                username: username,
                id: user.id
            }
        })
        history.push("/login")};
    }

    return (
        <div>
            <form onSubmit={sendEmail}>
                <div>
                    <label>
                        Username:
                    </label>
                    <input
                        type='text'
                        name="username"
                        value={username}
                        required
                        onChange={(evt) => setUsername(evt.target.value)}
                    />
                </div>
                <button type="submit">Send Reset Email</button>
            </form>
        </div>
    )
}

export default ForgotPassword;