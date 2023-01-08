import { useEffect } from 'react';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AllUsersDetails.css';
=======
import './UserDetails.css';
>>>>>>> main:src/components/UserDetails/UserDetails.jsx
import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

function AllUsersDetails() {
  const allUsersList = useSelector(store => store.allUsers);
=======
function UserDetails() {
  const activeUser = useSelector(store => store.editUser);
>>>>>>> main:src/components/UserDetails/UserDetails.jsx
  const user = useSelector((store) => store.user);
  const params = useParams();
  console.log(params.id)
  const history = useHistory();
  const dispatch = useDispatch();
<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx

=======
  console.log("the user is", user);
  console.log("all the users are", activeUser);
>>>>>>> main:src/components/UserDetails/UserDetails.jsx

useEffect(() => {
  pageFadeIn(), // Call fade effect, yes I know this is spelled wrong
  dispatch({ 
    type: "FETCH_EDIT_USER",
    payload: params.id
 })
}, [params.id]);

//Fade effect
function pageFadeIn() {
  document.body.classList.remove("withOpacity");
  document.body.classList.add("noOpacity");
  setTimeout(() => document.body.classList.remove("noOpacity"), 100);
  setTimeout(() => document.body.classList.add("withOpacity"), 100);
};

const deleteUser = (id) => {
  console.log('in AllUsers deleteUser, the users id is', id)
  dispatch({
    type: "DELETE_USER",
    payload: params.id,
  });
  setTimeout(() => {
    history.push('/allusers')
  }, 1500); 
}


const [confirmationOpen, setConfirmatinoOpen] = React.useState(false);
const handleConfirmationOpen = () => {
  setConfirmatinoOpen(true);
};
const handleConfirmationClose = () => {
  setConfirmatinoOpen(false)
}

  return (
    <>
      {/* Just a placeholder, I think it'd be cool to incorporate their styling as much as possible though. */}
      <div className='bannerTop'></div> 
      <section className='alluserDetailsContainer'>
<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx
      <Button
            onClick={() => history.push('/allusers')}
            sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', m: 3,                
            '&:hover': {
            fontSize: 16
            },}}
          ><ArrowCircleLeftIcon/>Back To User List</Button>
        {allUsersList.map(allUsers => (
          (params.id == allUsers.id && (
            <ul key={allUsers.username} >
              <h2> {allUsers.fname} {allUsers.lname}</h2>
=======
       
            <ul>
              <h2> {activeUser.fname} {activeUser.lname}</h2>
>>>>>>> main:src/components/UserDetails/UserDetails.jsx
              {user.userType == 5 && (
                <div>
                  <li>            
                    {activeUser.userType == 5 && (
                      <span>Admin</span>
                    )}
                    {activeUser.userType == 4 && (
                      <span>Mentor</span>
                    )}
                    {activeUser.userType == 3 && (
                      <span>Youth/Mentee</span>
                    )}
                    {activeUser.userType == 2 && (
                      <span>Caregiver</span>
                    )}
                    {activeUser.userType == 1 && (
                      <span>Volunteer</span>
                    )}
                  </li>
                  <li>
                    Pronouns: {activeUser.pronouns}
                  </li>
                  <li>
                    Email: {activeUser.username}
                  </li>
                  <li>
<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx
                    Bio: <br/>{allUsers.bio}
=======
                    Bio: {activeUser.bio}
>>>>>>> main:src/components/UserDetails/UserDetails.jsx
                  </li>
                  {activeUser.userType == 3 && (
                  <li>
                  Mentor: {activeUser.mentor_firstname} {activeUser.mentor_lastname}
                  </li>
                  )}
                  {activeUser.userType == 4 && (
                  <li>
                  Mentee: {activeUser.mentor_firstname} {activeUser.mentor_lastname}
                  </li>
                  )}
                  <li>
<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx
                      <Button 
                        onClick={() => history.push(`/allusers/${allUsers.id}/edit`)}
                        variant='contained'
                        size = "small"
                        sx = {{bgcolor: '#357590', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                        '&:hover': {
                        backgroundColor: '#357590',
                        boxShadow: '6px 6px 0px #90c5bf'
                        },}}
                      >
                       <EditIcon/>
                      </Button>
=======
                    <Link to={`/allusers/${activeUser.id}/edit`} className='editUserBtn'>
                      <Button variant='contained'>Edit User</Button>
                    </Link>                  
>>>>>>> main:src/components/UserDetails/UserDetails.jsx
                  </li>
                  {/* <Button
                    sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                    '&:hover': {
                    backgroundColor: '#cf2317',
                    boxShadow: '6px 6px 0px #fe6d0e'
                    },}}
                    variant="contained"
<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx
                    value={allUsers.id}
                    // onClick={(evt) => deleteUser(evt.target.value)}
                    onClick = {handleConfirmationOpen}
=======
                    color="error"
                    value={activeUser.id}
                    onClick={(evt) => deleteUser(evt.target.value)}
>>>>>>> main:src/components/UserDetails/UserDetails.jsx
                  >
                    Delete User
                  </Button>
                  <Dialog
            open={confirmationOpen}
            // TransitionComponent={Transition}
            keepMounted
            onClose={handleConfirmationClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx = {{textAlign: 'center'}}>{"Are you sure you want to delete this user?"}</DialogTitle>
            <DialogActions>
              <Button variant="contained" 
                onClick={(evt) => deleteUser(evt.target.value)}

              // onClick={eventUnregistration}
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              >
                Delete
              </Button>
              <Button 
              variant="contained" 
              onClick={handleConfirmationClose}
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog> */}
                </div>
              )}


        {/* <Dialog
            open={confirmationOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleConfirmationClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx = {{textAlign: 'center'}}>{"Are you sure you want to delete this user?"}</DialogTitle>
            <DialogActions>
              <Button variant="contained" 
                onClick={(evt) => deleteUser(evt.target.value)}

              // onClick={eventUnregistration}
              sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
              '&:hover': {
              backgroundColor: '#cf2317',
              boxShadow: '6px 6px 0px #fe6d0e'
              },}}
              >
                Delete
              </Button>
              <Button 
              variant="contained" 
              onClick={handleConfirmationClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog> */}
              
              {user.userType == 4 && (
                <div>
                  <li>
                    Pronouns: {activeUser.pronouns}
                  </li>
                  <li>
                    Email: {activeUser.username}
                  </li>
                  <li>
                    Bio: {activeUser.bio}
                  </li>
                </div>
              )}

              {user.userType < 4 && (
                <div>
                  <li>
                    Pronouns: {activeUser.pronouns}
                  </li>
                  <li>
                    Bio: {activeUser.bio}
                  </li>
                </div>
              )}
            </ul>
<<<<<<< HEAD:src/components/AllUsersDetails/AllUsersDetails.jsx
          ))
        ))}

=======
        <Link to="/allusers">
          <Button>Back To Events List</Button>
        </Link>
>>>>>>> main:src/components/UserDetails/UserDetails.jsx
      </section>
    </>
  );
}

export default UserDetails;