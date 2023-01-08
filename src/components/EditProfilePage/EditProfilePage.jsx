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
//Fade effect

const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
        type: "SAVE_USER",
        payload: user
    }),
    dispatch({
        type: 'FETCH_USER'
    });
    history.push('/home')
}

const deleteUser = (id) => {
    console.log('in delete item function onclick')
        dispatch({
          type: "DELETE_USER",
          payload: id,
        });
    history.push('/home')
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
                <Button type="submit" className="editUserSubmit"  size="small"
                    sx = {{bgcolor: '#46a452e6', fontWeight: 'bold', letterSpacing: 1.5, m: 2, color: 'white',               
                    '&:hover': {
                    backgroundColor: '#46a452e6',
                    boxShadow: '6px 6px 0px #82bc27e0'
                    },}}
                >
                    Submit Changes
                </Button>
                <Button 
                    onClick={() => deleteUser(user.id)} className="editUserDelete" 
                    size="small"
                    sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                    '&:hover': {
                    backgroundColor: '#cf2317',
                    boxShadow: '6px 6px 0px #fe6d0e'
                    },}}
                    variant="contained"
                    >
                    Delete Your Profile
                </Button>
                <Button
                    onClick={() => history.push('/home')}
                    sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', m: 3,                
                    '&:hover': {
                    fontSize: 16
                    },}}
                >
                    <ArrowCircleLeftIcon/>Home
                </Button>
                </div>             
            </form>
        </div>   
    </div>
);

}

export default EditProfilePage;

