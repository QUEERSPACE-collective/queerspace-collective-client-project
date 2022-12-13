import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddResourceForm.css';

// CUSTOM COMPONENTS

function AddResourceForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const newResourceName = useSelector(store=>store.newResourceName);
  const newResourceDescription = useSelector(store=>store.newResourceDescription);
  const newResourceLink = useSelector(store=>store.newResourceLink);

  function onSubmit(e){
    e.preventDefault();
    dispatch({
      type: 'SUBMIT_NEW_RESOURCE',
      payload:{
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
      <h1>Add Resource Form</h1>

      <form onSubmit={onSubmit}>
        <label for='newResourceName'>Resource Name: </label>
        <input type='text' value={newResourceName} id='newResourceName' onChange={(e)=>{dispatch({type: 'SAVE_NEW_RESOURCE_NAME', payload: e.target.value})}}></input>
        <br/>
        <br/>
        <label for='newResourceDescription'>Description: </label>
        <input type='text' value={newResourceDescription} id='newResourceDescription' onChange={(e)=>(dispatch({type:'SAVE_NEW_RESOURCE_DESCRIPTION',payload: e.target.value}))}></input>
        <br/>
        <br/>
        <label for='newResourceLink'>Link: </label>
        <input type='url' value={newResourceLink} id='newResourceLink' onChange={(e)=>{dispatch({type: 'SAVE_NEW_RESOURCE_LINK', payload: e.target.value})}}></input>
        <br/>
        <br/>
        <button type='submit'>Add Resource</button>
      </form>
    </>
  );
}

export default AddResourceForm;
