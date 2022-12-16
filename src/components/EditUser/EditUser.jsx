import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditUser.css';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import TextField from '@mui/material/TextField';

// CUSTOM COMPONENTS

function EditUser() {
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params.id);
    const history = useHistory();

    useEffect(() => {
        dispatch({
            type: "FETCH_EDIT_USER",
            payload: params.id
        });

        return () => {
          dispatch({
            type: "CLEAR_EDIT_USER"
          })
        }
    }, [params.id]);


    const user = useSelector(store => store.editUser);
    console.log(user);

    const onSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_USER",
            payload: user
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

    return (
        <div className='editUserContainer'>
            <div>
                <h1>Edit User</h1>   
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
                <TextField
                    id="uType"
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
                    Mentor:
                </label>
                <TextField
                    id="mentor"
                    value={user && user.mentorPair}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { mentorPair: evt.target.value }
                    })}
                />
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

