import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Card, Box, OutlinedInput } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Button from '@mui/material/Button';
import './AddResourceForm.css';

function AddResourceForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const newResourceName = useSelector(store => store.newResourceName);
  const newResourceDescription = useSelector(store => store.newResourceDescription);
  const newResourceLink = useSelector(store => store.newResourceLink);

  useEffect(() => {
    pageFadeIn()
  }, [])

  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'SUBMIT_NEW_RESOURCE',
      payload: {
        resourceName: newResourceName,
        resourceDescription: newResourceDescription,
        resourceLink: newResourceLink
      }
    });
    dispatch({
      type: 'CLEAR_NEW_RESOURCE_FORM'
    });
  }
  return (
    <div className='addNewResorceFormContainer'>
      <Button
      onClick={() => history.push('/resources')}
      sx = {{fontWeight: 'bold', wordSpacing: 1, color: '#357590', m: 3,                
      '&:hover': {
      fontSize: 16
      },}}
      >
        <ArrowCircleLeftIcon/> Back To Resources
      </Button>
      <h1>Add a New Resource</h1>
      <Card sx = {{bgcolor: '#f8f8f9', width: '40%', pb: 10, pt: 5, textAlign: 'center'}}>
      <form onSubmit={onSubmit}>      

        <label for='newResourceName'>Title: </label><br/>
        <OutlinedInput type='text' value={newResourceName} id='newResourceName' onChange={(e)=>{dispatch({type: 'SAVE_NEW_RESOURCE_NAME', payload: e.target.value})}}></OutlinedInput>
        <br/>
        <br/>
        <label for='newResourceDescription'>Description: </label><br/>
        <TextField multiline rows = {3}style = {{width: '50%'}}type='text' value={newResourceDescription} id='newResourceDescription' onChange={(e) => (dispatch({ type: 'SAVE_NEW_RESOURCE_DESCRIPTION', payload: e.target.value }))}></TextField>
        <br />
        <br />
        <label for='newResourceLink'>Link: </label><br/>
        <OutlinedInput type='url' value={newResourceLink} id='newResourceLink' onChange={(e)=>{dispatch({type: 'SAVE_NEW_RESOURCE_LINK', payload: e.target.value})}}></OutlinedInput>
        <br/>
        <br/>
        <Button type = "submit"
          sx = {{bgcolor: '#f39536', fontWeight: 'bold', wordSpacing: 1, m: 2, color: 'white',               
          '&:hover': {
          backgroundColor: '#f39536',
          boxShadow: '6px 6px 0px #e2bf05'
          },}}
          >
            Add
        </Button>
      </form>
      </Card>
    </div>
  );
}

export default AddResourceForm;
