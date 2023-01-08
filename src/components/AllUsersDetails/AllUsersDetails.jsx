import { useEffect } from 'react';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './AllUsersDetails.css';
import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

function AllUsersDetails() {
  const allUsersList = useSelector(store => store.allUsers);
  const user = useSelector((store) => store.user);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();


useEffect(() => {
  animater(), // Call fade effect, yes I know this is spelled wrong
  dispatch({ type: "FETCH_ALL_USERS" })
}, []);

//Fade effect
function animater() {
  document.body.classList.remove("noSalmon");
  document.body.classList.add("salmon");
  setTimeout(() => document.body.classList.remove("salmon"), 100);
  setTimeout(() => document.body.classList.add("noSalmon"), 100);
};
//Fade effect

const deleteUser = (id) => {
  console.log('in allUsersDetails deleteUser, the users id is', id)
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
              {user.userType == 5 && (
                <div>
                  <li>
                    {allUsers.userType == 5 && (
                      <span>Admin</span>
                    )}
                    {allUsers.userType == 4 && (
                      <span>Mentor</span>
                    )}
                    {allUsers.userType == 3 && (
                      <span>Youth/Mentee</span>
                    )}
                    {allUsers.userType == 2 && (
                      <span>Caregiver</span>
                    )}
                    {allUsers.userType == 1 && (
                      <span>Volunteer</span>
                    )}
                  </li>
                  <li>
                    Pronouns: {allUsers.pronouns}
                  </li>
                  <li>
                    Email: {allUsers.username}
                  </li>
                  <li>
                    Bio: <br/>{allUsers.bio}
                  </li>
                  {allUsers.userType == 3 && (
                  <li>
                  Mentor: {allUsers.mentor_firstname} {allUsers.mentor_lastname}
                  </li>
                  )}
                  {allUsers.userType == 4 && (
                  <li>
                  Mentee: {allUsers.mentor_firstname} {allUsers.mentor_lastname}
                  </li>
                  )}
                  <li>
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
                  </li>
                  {/* <Button
                    sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                    '&:hover': {
                    backgroundColor: '#cf2317',
                    boxShadow: '6px 6px 0px #fe6d0e'
                    },}}
                    variant="contained"
                    value={allUsers.id}
                    // onClick={(evt) => deleteUser(evt.target.value)}
                    onClick = {handleConfirmationOpen}
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
                    Pronouns: {allUsers.pronouns}
                  </li>
                  <li>
                    Email: {allUsers.username}
                  </li>
                  <li>
                    Bio: {allUsers.bio}
                  </li>
                </div>
              )}

              {user.userType < 4 && (
                <div>
                  <li>
                    Pronouns: {allUsers.pronouns}
                  </li>
                  <li>
                    Bio: {allUsers.bio}
                  </li>
                </div>
              )}
            </ul>
          ))
        ))}

      </section>
    </>
  );
}

export default AllUsersDetails;