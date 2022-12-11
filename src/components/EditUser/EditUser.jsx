import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditUser.css';

// CUSTOM COMPONENTS

function EditUser() {
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params.id);
    const history = useHistory();

    const user = useSelector(store => store.allUsers);
    console.log(user);

    useEffect(() => {
        dispatch({
            type: "FETCH_EDIT_USER",
            payload: params.id
        });
    }, [params.id]);

    const onSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_USER",
            payload: user
        });
        history.push('/alluserslist')
    }

    return (
        <div>
            <div>
                <h1>Edit User</h1>   
            </div>
            <form onSubmit={onSubmit}>
                <div>
                <label>
                    First Name:
                </label>
                <input
                    value={user.fname}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { fname: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Last Name:
                </label>
                <input
                    value={user.lname}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { lname: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    User Type:
                </label>
                <input
                    value={user.userType}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { userType: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Pronouns:
                </label>
                <input
                    value={user.pronouns}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { pronouns: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Bio:
                </label>
                <input
                    value={user.bio}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { bio: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Profile Picture:
                </label>
                <input
                    value={user.profilePic}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { profilePic: evt.target.value }
                    })}
                />
                </div>
                {/* If the user is a mentee; for mentors it will say Mentee */}
                <div>
                <label>
                    Mentor:
                </label>
                <input
                    value={user.mentorPair}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_USER',
                        payload: { mentorPair: evt.target.value }
                    })}
                />
                </div>
                <button type="submit">Submit</button>
            </form>

            <Link to="/alluserslist">
                <button>Back To User List</button>
            </Link>
        </div>
    )
}

export default EditUser;

