import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import './AddResourceForm.css';

function AddResourceForm() {
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
    <>
      <h1 className='bannerTop'>Add a New Resource</h1>

      <form onSubmit={onSubmit}>
        <label for='newResourceName'>Name: </label>
        <input type='text' value={newResourceName} id='newResourceName' onChange={(e)=>{dispatch({type: 'SAVE_NEW_RESOURCE_NAME', payload: e.target.value})}}></input>
        <br/>
        <br/>
        <label for='newResourceDescription'>Description: </label>
        <input type='text' value={newResourceDescription} id='newResourceDescription' onChange={(e) => (dispatch({ type: 'SAVE_NEW_RESOURCE_DESCRIPTION', payload: e.target.value }))}></input>
        <br />
        <br />
        <label for='newResourceLink'>Link: </label>
        <input type='url' value={newResourceLink} id='newResourceLink' onChange={(e)=>{dispatch({type: 'SAVE_NEW_RESOURCE_LINK', payload: e.target.value})}}></input>
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
    </>
  );
}

export default AddResourceForm;
