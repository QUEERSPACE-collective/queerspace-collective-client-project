import { useEffect } from 'react';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import {List, Card} from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import './UserDetails.css';

function UserDetails() {
  // fetching current user details from the redux store 
  const activeUser = useSelector(store => store.editUser);
  const user = useSelector((store) => store.user);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();


useEffect(() => {
  pageFadeIn(), 
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


  return (
    <div className='alluserDetailsContainer'>
        <Button
        onClick={() => history.push('/allusers')}
        sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', m: 3,                
        '&:hover': {
        fontSize: 16
        },}}
        >
          <ArrowCircleLeftIcon/> Back To User List
      </Button>

      <Card className='userDetailsCard'
        sx = {{mt: 4, pl: 10, pr: 10, border: 0.5, borderRadius: 2, width: '50%', bgcolor: '#f8f8f9'}}>
        <List>
            <h1 className='userDetailsName'> {activeUser.fname} {activeUser.lname}</h1>
        <br/>
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
                <span>Pronouns:</span> {activeUser.pronouns}
              </li>
              <li>
                <span>Email:</span> {activeUser.username}
              </li>
              <li id = "BioLi">
                <span>Bio:</span> <br/>{activeUser.bio}
              </li>

              {/* if user type is 3 (mentee), render */}
              {activeUser.userType == 3 && (
              <li>
              <span>Mentor:</span>{activeUser.mentor_firstname} {activeUser.mentor_lastname}
              </li>
              )}

              {/* if user type is 4 (mentor), render */}
              {activeUser.userType == 4 && (
              <li>
              <span>Mentee:</span> {activeUser.mentor_firstname} {activeUser.mentor_lastname}
              </li>
              )}
              <li>
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
              </li>
            </div>
          )}
              
          {user.userType == 4 && (
            <div>
              <li>
                <span>Pronouns:</span> {activeUser.pronouns}
              </li>
              <li>
                <span>Email:</span> {activeUser.username}
              </li>
              <li id = "BioLi">
                <span>Bio:</span><br/>{activeUser.bio}
              </li>
            </div>
          )}

          {user.userType < 4 && (
            <div>
              <li>
                <span>Pronouns:</span> {activeUser.pronouns}
              </li>
              <li id = "BioLi">
                <span>Bio:</span><br/>{activeUser.bio}
              </li>
              </div>
            )}
          </List>
      </Card>
    </div>

  );
}

export default UserDetails;