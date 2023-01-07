import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const history = useHistory();


    const sendEmail = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SEND_RESET_EMAIL",
            payload: {
                username: username
            }
        });
        history.push("/login");
    };

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