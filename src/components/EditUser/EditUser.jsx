import * as React from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditUser.css';
import Button from '@mui/material/Button';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function EditUser() {
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();
    const allUsers = useSelector(store => store.allUsers);
    const [alertOpen, setAlertOpen] = React.useState(false);


    const handleAlertClick = () => {
        setAlertOpen(true);
      };
      const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen(false);
      };


      const [confirmationOpen, setConfirmatinoOpen] = React.useState(false);
      const handleConfirmationOpen = () => {
        setConfirmatinoOpen(true);
      };
      const handleConfirmationClose = () => {
        setConfirmatinoOpen(false)
      }
    

    useEffect(() => {
        pageFadeIn(),
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
    function pageFadeIn() {
        document.body.classList.remove("withOpacity");
        document.body.classList.add("noOpacity");
        setTimeout(() => document.body.classList.remove("noOpacity"), 100);
        setTimeout(() => document.body.classList.add("withOpacity"), 100);
    }

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
    handleAlertClick();
    setTimeout(() => {
      history.push(`/userdetails/${user.id}`)
    }, 1500); 
}

const deleteUser = (id) => {
    console.log('in delete item function onclick')
    dispatch({
        type: "DELETE_USER",
        payload: id,
    });
    setTimeout(() => {
        history.push('/allusers')
      }, 1500); 
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
            <div className='editUserContainerHeader'>
            <Link to="/allusers" className="backToUserList">
                    <Button 
                        sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590',                
                        '&:hover': {
                        fontSize: 16
                        },}}
                        size="small">
                           <ArrowCircleLeftIcon/> Back To User List
                    </Button>
                </Link>
                <h1>Edit User</h1>
            </div>
            <div className="formContainer">
                <form onSubmit={onSubmit} className='editUserForm' >
                    <label htmlFor="fName">
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
                        rows={8}
                        multiline
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
             
                <Button type="submit" className="editUserSubmit" 
                 size="small"
                 sx = {{bgcolor: '#46a452e6', fontWeight: 'bold', letterSpacing: 1.5, m: 2, color: 'white',               
                 '&:hover': {
                 backgroundColor: '#46a452e6',
                 boxShadow: '6px 6px 0px #82bc27e0'
                 },}}
                 >
                    Submit Changes
                </Button>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={alertOpen} onClose={handleAlertClose}>
                        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                            Changes Submitted!
                        </Alert>
                    </Snackbar>
                </Stack>




                <Button 
                sx = {{bgcolor: '#cf2317', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
                '&:hover': {
                backgroundColor: '#cf2317',
                boxShadow: '6px 6px 0px #fe6d0e'
                },}}
                variant="contained"
                value={allUsers.id}
                onClick = {handleConfirmationOpen}
                >
                    Delete User
                </Button>

                <Dialog
                open={confirmationOpen}
                keepMounted
                onClose={handleConfirmationClose}
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle sx = {{textAlign: 'center'}}>{"Are you sure you want to delete this user?"}</DialogTitle>
                <DialogActions>
                <Button variant="contained" 
                    onClick={() => deleteUser(user.id)}
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
                </Dialog>
                </div>   
                </form>
                </div>
            </div>
                   

    )
}

export default EditUser;

