import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import './EditProfilePage.css';

// CUSTOM COMPONENTS

function EditProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const user = useSelector((store) => store.editUser);

    useEffect(() => {
        dispatch({
            type: "FETCH_EDIT_PROFILE",
            payload: params.id
        });
    }, [params.id]);

    const onSubmit = (evt) => {
        evt.preventDefault();
        dispatch({
            type: "SAVE_PROFILE",
            payload: user
        });
        history.push('/profilepage')
    }

    return (
        <div>
            <div>
                <h1>Edit User</h1>   
            </div>
            <form onSubmit={onSubmit}>
                <div>
                <label>
                    Profile Picture:
                </label>
                <input
                    value={user && user.profilePic}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_PROFILE',
                        payload: { profilePic: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    First Name:
                </label>
                <input
                    value={user && user.fname}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_PROFILE',
                        payload: { fname: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Last Name:
                </label>
                <input
                    value={user && user.lname}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_PROFILE',
                        payload: { lname: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Pronouns:
                </label>
                <input
                    value={user && user.pronouns}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_PROFILE',
                        payload: { pronouns: evt.target.value }
                    })}
                />
                </div>
                <div>
                <label>
                    Bio:
                </label>
                <input
                    value={user && user.bio}
                    onChange={(evt) => dispatch({
                        type: 'UPDATE_EDIT_PROFILE',
                        payload: { bio: evt.target.value }
                    })}
                />
                </div>
                <button type="submit">Submit</button>
            </form>

            
            <Link to="/profilepage">
                <button>Back To Profile Page</button>
            </Link>
        </div>
    )
}

export default EditProfilePage;

