import {useState} from "react";
import {useDispatch} from "react-redux";
import { Link, useHistory } from "react-router-dom";
import './AddUserForm.css';

// CUSTOM COMPONENTS

function AddUserForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    username: "",
  });

  function addUser(evt) {
    evt.preventDefault();
    setNewUser({
      ...newUser,
      username: evt.target.value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    dispatch({
      type: "ADD_USER",
      payload: newUser
    })
    history.push('/allusers');
  }

  return (
    <div>
    <h1 className='bannerTop'>Add New User</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
      </label>
      <input
        onChange={addUser}
      />
      <button type="submit">Submit</button>
    </form>
    </div>

  );
}

export default AddUserForm;