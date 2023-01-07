import { useParams, useHistory, Link } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function EditProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const user = useSelector((store) => store.editUser);

    useEffect(() => {
        animater(),
            dispatch({
                type: "FETCH_EDIT_PROFILE",
                payload: params.id
            }),
            dispatch({ type: "FETCH_EDIT_USER" });
    }, [params.id]);

    //Fade effect
    function animater() {
        document.body.classList.remove("noSalmon");
        document.body.classList.add("salmon");
        setTimeout(() => document.body.classList.remove("salmon"), 100);
        setTimeout(() => document.body.classList.add("noSalmon"), 100);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_USER",
            payload: user
        }),
            dispatch({
                type: 'FETCH_USER'
            });
        history.push('/profilepage')
    }

    const deleteUser = (id) => {
        console.log('in delete item function onclick')
        dispatch({
            type: "DELETE_USER",
            payload: id,
        });
        history.push('/profilepage')
    }

    return (
        <div className='editUserContainer'>
            <div>
                <h1 className='bannerTop'>Edit Profile</h1>
            </div>
            <div className="formContainer">
                <form onSubmit={onSubmit} className='editUserForm' >
                    <label for="fName">
                        First Name:
                    </label>
                    <TextField
                        id="fName"
                        value={user && user.fname}
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_EDIT_USER',
                            payload: { fname: evt.target.value }
                        })}
                    />
                    <label for="lName">
                        Last Name:
                    </label>
                    <TextField
                        id="lName"
                        value={user && user.lname}
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_EDIT_USER',
                            payload: { lname: evt.target.value }
                        })}
                    />
                    <label for="pronouns">
                        Pronouns:
                    </label>
                    <TextField
                        id="pronouns"
                        value={user && user.pronouns}
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_EDIT_USER',
                            payload: { pronouns: evt.target.value }
                        })}
                    />
                    <label for="bio">
                        Bio:
                    </label>
                    <TextField
                        id="bio"
                        value={user && user.bio}
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_EDIT_USER',
                            payload: { bio: evt.target.value }
                        })}
                    />
                    {/* TODO: If the user is a mentee; for mentors it will say Mentee */}
                    <label for="mentor">
                        Mentor:
                    </label>
                    <TextField
                        id="mentor"
                        disabled
                        value={user && user.mentorPair}
                    />
                    <div className="editUserBottom">
                        <Button type="submit" className="editUserSubmit" variant="contained" size="small">Submit Changes</Button>
                        <Button onClick={() => deleteUser(user.id)} className="editUserDelete" variant="contained" size="small">Delete Your Profile</Button>
                        <Link to="/profilepage" className="backToUserList">
                            <Button variant="contained" size="small"><ArrowCircleLeftIcon /> &nbsp; Back To Profile</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePage;

