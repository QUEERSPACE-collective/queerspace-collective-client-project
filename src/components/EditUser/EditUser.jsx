import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditUser.css';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function EditUser() {
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params.id);
    const history = useHistory();
    const allUsers = useSelector(store => store.allUsers);

    useEffect(() => {
        animater(),
        dispatch({
            type: "FETCH_EDIT_USER",
            payload: params.id
        });

        return () => {
          dispatch({
            type: "CLEAR_EDIT_USER"
          })
        },
        dispatch({ type: "FETCH_ALL_USERS" })
    }, [params.id]);

//Fade effect
function animater() {
    document.body.classList.remove("noSalmon");
    document.body.classList.add("salmon");
    setTimeout(() => document.body.classList.remove("salmon"), 100);
    setTimeout(() => document.body.classList.add("noSalmon"), 100);
}
//Fade effect

const user = useSelector(store => store.editUser);
console.log(user);
const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
        type: "SAVE_USER",
        payload: user
    }),
    dispatch({
        type: 'FETCH_USER'
    });
    history.push('/allusers')
}

const deleteUser = (id) => {
    console.log('in delete item function onclick')
    dispatch({
        type: "DELETE_USER",
        payload: id,
    });
    history.push('/allusers')
}

let mentorOptions = allUsers.map(user => {
    console.log(user)
        return {
            label: `${user.fname} ${user.lname}`,
            id: user.id,
            type: user.userType
        }
    })

    const pickMentor = (evt, mentor) => {
        evt.preventDefault();
        dispatch({
            type: "UPDATE_EDIT_USER",
            payload: { mentorPair: mentor }
        })
    }
    return (
        <div className='editUserContainer'>
            <div>
                <h1 className='bannerTop'>Edit User</h1>   
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
                <label for="uType">
                    User Type:
                </label>
                <FormControl  >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user && user.userType}
                        displayEmpty
                        onChange={(evt) => dispatch({
                            type: 'UPDATE_EDIT_USER',
                            payload: { userType: evt.target.value }
                        })}
                    >
                        <MenuItem value={1}>Volunteer</MenuItem>
                        <MenuItem value={2}>Caregiver</MenuItem>
                        <MenuItem value={3}>Mentee/Youth</MenuItem>
                        <MenuItem value={4}>Mentor</MenuItem>
                        <MenuItem value={5}>Admin</MenuItem>
                    </Select>
                </FormControl>
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
                <label for="pPic">
                    Profile Picture:
                </label>
                <TextField
                    id="pPic"
                    value={user && user.profilePic}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { profilePic: evt.target.value }
                    })}
                />
                {/* TODO: If the user is a mentee; for mentors it will say Mentee */}
                <label for="mentor">
                    Mentor/Mentee:
                </label>
                <form>
                <Autocomplete 
                    disablePortal
                    id="combo-box-demo"
                    options={mentorOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Pick One" />}
                    onChange={(evt, mentor) => pickMentor(evt, mentor.id)}      
                />
                </form>
                <div className="editUserBottom">
                <Button type="submit" className="editUserSubmit" variant="contained" size="small">Submit Changes</Button>
                <Button onClick={() => deleteUser(user.id)} className="editUserDelete" variant="contained" size="small">Delete User</Button>
                <Link to="/allusers" className="backToUserList">
                <Button variant="contained" size="small"><ArrowCircleLeftIcon /> &nbsp; Back To User List</Button>
                </Link>
                </div>               
            </form>
            </div>          
        </div>
    )
}

export default EditUser;

