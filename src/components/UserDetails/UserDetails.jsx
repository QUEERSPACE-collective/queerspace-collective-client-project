import { useEffect } from 'react';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import {List, ListItem, Card} from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './UserDetails.css';
import {
  HashRouter as Router,
  Link,
} from 'react-router-dom';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });


function UserDetails() {
  const activeUser = useSelector(store => store.editUser);
  const user = useSelector((store) => store.user);
  const params = useParams();
  console.log(params.id)
  const history = useHistory();
  const dispatch = useDispatch();


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
      
      <section className='alluserDetailsContainer'>
      <Button
            onClick={() => history.push('/allusers')}
            sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', m: 3,                
            '&:hover': {
            fontSize: 16
            },}}
          ><ArrowCircleLeftIcon/>Back To User List</Button>
          <Card
            sx={{
              p:2,
              m: 'auto',
              width: '50%'
            }}
          >
            <List>
              <h2> {activeUser.fname} {activeUser.lname}</h2>
              {user.userType == 5 && (
                <div>
                  <ListItem>            
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
                  </ListItem>
                  <ListItem>
                    Pronouns: {activeUser.pronouns}
                  </ListItem>
                  <ListItem>
                    Email: {activeUser.username}
                  </ListItem>
                  <ListItem>

                    Bio: {activeUser.bio}
                  </ListItem>
                  {activeUser.userType == 3 && (
                  <ListItem>
                  Mentor: {activeUser.mentor_firstname} {activeUser.mentor_lastname}
                  </ListItem>
                  )}
                  {activeUser.userType == 4 && (
                  <ListItem>
                  Mentee: {activeUser.mentor_firstname} {activeUser.mentor_lastname}
                  </ListItem>
                  )}
                  <ListItem>
                      <Button 
                        onClick={() => history.push(`/allusers/${activeUser.id}/edit`)}
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

                  </ListItem>
                  
                </div>
              )}

              {user.userType == 4 && (
                <div>
                  <ListItem>
                    Pronouns: {activeUser.pronouns}
                  </ListItem>
                  <ListItem>
                    Email: {activeUser.username}
                  </ListItem>
                  <ListItem>
                    Bio: {activeUser.bio}
                  </ListItem>
                </div>
              )}

              {user.userType < 4 && (
                <div>
                  <ListItem>
                    Pronouns: {activeUser.pronouns}
                  </ListItem>
                  <ListItem>
                    Bio: {activeUser.bio}
                  </ListItem>
                </div>
              )}
            </List>
           </Card>     

      </section>
    </>
  );
}

export default UserDetails;