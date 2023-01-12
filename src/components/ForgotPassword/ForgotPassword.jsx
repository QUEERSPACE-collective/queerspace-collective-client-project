import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import './ForgotPassword.css';

function ForgotPassword() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const history = useHistory();

    // on submit, send email to email(username) that is entered in and return to login page
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
            <form className="forgotform" onSubmit={sendEmail}>
                <div>
                    <h1>Forgot Password?</h1>
                </div>
                <div>
                    <h4>
                        If you have forgotten your password, please enter<br></br> your account's
                        email address below and click the <br></br>"Send Reset Email" button. You
                        will receive an <br></br>email that contains a link to set a new password.
                    </h4>
                </div>
                <div>
                    <input
                        className="inputforgot"
                        placeholder="Email"
                        type='text'
                        name="username"
                        value={username}
                        required
                        onChange={(evt) => setUsername(evt.target.value)}
                    />
                </div>
                <Button type="submit"
                    sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                    '&:hover': {
                    backgroundColor: '#357590',
                    boxShadow: '6px 6px 0px #90c5bf'
                    },}}
                >
                    Send Reset Email
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword;