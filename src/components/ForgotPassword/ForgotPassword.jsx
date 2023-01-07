import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

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