import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditUser.css';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

function EditUser() {
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params.id);
    const history = useHistory();
    const [userType, setUserType] = useState(0);
    const allUsers = useSelector(store => store.allUsers);
    const [mentor, setMentor] = useState(0);

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
console.log(mentorOptions);

const mentorPair = useSelector(store => store.editUser.mentorPair)
const updateMentor = () => {
    console.log('in update mentor function onclick')
    dispatch({
        type: "SAVE_MENTOR",
        payload: mentorPair
    });
}
    const pickMentor = (evt, mentor) => {
        evt.preventDefault();
        dispatch({
            type: "UPDATE_MENTOR",
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
                {/* min/max didn't work in a TextField. I could conditional it, but here's a simple fix for now */}
                {/* mobile doesn't work with #, might have to conditional render after all  */}
                <input
                    id="uType"
                    type="number"
                    max='5'
                    min='1'
                    value={user && user.userType}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { userType: evt.target.value }
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
                {/* If the user is a mentee; for mentors it will say Mentee */}
                <label for="mentor">
                    Mentor/Mentee:
                </label>
                <form>
                <FormControl className='formControl'>
                    <Select
                        sx={{height:'20px',marginTop:'3px',marginRight:'25px',outline:'none',border:'1px solid black'}}
                        id="demo-simple-select" 
                        value={userType}
                        onChange={(evt) => setUserType(evt.target.value)}
                        className='allusersSelect'
                    >
                        <MenuItem value={0}>All Users</MenuItem>
                        <MenuItem value={3}>Mentees/Youth</MenuItem>
                        <MenuItem value={4}>Mentors</MenuItem>
                    </Select>
                </FormControl>
                <Autocomplete 
                    disablePortal
                    id="combo-box-demo"
                    options={mentorOptions}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Pick One" />}
                    onChange={(evt, mentor) => pickMentor(evt, mentor.id)}
                        
                />
                <Button onClick={updateMentor}>Confirm Mentor</Button>
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

