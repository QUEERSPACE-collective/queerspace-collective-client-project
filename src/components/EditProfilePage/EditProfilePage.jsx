import { useParams, useHistory, Link } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import './EditProfilePage.css';


function EditProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const user = useSelector((store) => store.editUser);

    useEffect(() => {
        pageFadeIn(),
            dispatch({
                type: "FETCH_EDIT_PROFILE",
                payload: params.id
            }),
            dispatch({ type: "FETCH_EDIT_USER" });
    }, [params.id]);

    //Fade effect
    function pageFadeIn() {
        document.body.classList.remove("withOpacity");
        document.body.classList.add("noOpacity");
        setTimeout(() => document.body.classList.remove("noOpacity"), 100);
        setTimeout(() => document.body.classList.add("withOpacity"), 100);
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
        history.push('/homepage')
    }

    const deleteUser = (id) => {
        dispatch({
            type: "DELETE_USER",
            payload: id,
        });
        history.push('/homepage')
    }

    return (
        <div className='editUserContainer'>
            <div className="editUserContainerHeader">
            <Button
                onClick={() => history.push('/homepage')}
                sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', mt: 1,                
                '&:hover': {
                fontSize: 16
                },}}
            >
                <ArrowCircleLeftIcon/>Home
                </Button>
                <h1 className='bannerTop'>Edit Profile</h1>
            </div>
        
            <form onSubmit={onSubmit} className='editUserForm' >
                <label for="fName">
                    First Name:
                </label>
                <TextField
                sx = {{width: '200px'}}
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
                    sx = {{width: '200px'}}
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
                    sx = {{width: '150px'}}
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
                    sx = {{width: '350px'}}
                    rows={8}
                    multiline
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
                    sx = {{width: '200px'}}
                
                    id="mentor"
                    disabled
                    value={user && user.mentorPair}                 
                />
                <div className="editUserBottom">
                {/* <Button type="submit" className="editUserSubmit"  size="small"
                    sx = {{bgcolor: '#46a452e6', fontWeight: 'bold', m: 2, color: 'white',               
                    '&:hover': {
                    backgroundColor: '#46a452e6',
                    boxShadow: '6px 6px 0px #82bc27e0'
                    },}}
                >
                    Submit Changes
                </Button> */}
                <Button variant = "contained" 
                sx={{fontSize: '12px', bgcolor: '#46a452e6', fontWeight: 'bold', m: 2, color: 'white',               
                '&:hover': {
                backgroundColor: '#46a452e6',
                boxShadow: '6px 6px 0px #82bc27e0'
                },}}
                type = "submit"
                >
                    Submit changes
                </Button>

                <Button
                variant = "contained"
                sx = {{fontSize: '10px', bgcolor: '#cf2317', fontWeight: 'bold', m: 2, color: 'white', width: '200px',
                '&:hover': {
                    backgroundColor: '#cf2317',
                    boxShadow: '6px 6px 0px #fe6d0e'
                    }, }}
                onClick={() => deleteUser(user.id)} className="editUserDelete"

                >
                    Delete Your Profile
                </Button>

                </div>             
            </form>
            </div>
    );
}

export default EditProfilePage;

