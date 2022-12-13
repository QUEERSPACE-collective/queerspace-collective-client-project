import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddResourceForm.css';

// CUSTOM COMPONENTS

function AddResourceForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const newResourceName = useSelector(store=>store.newResourceName)

  return (
    <>
      <h1>Add Resource Form</h1>

      <form>
        <label for='newResourceName'>Resource Name: </label>
        <input type='text' value={newResourceName} id='newResourceName' onChange={(e)=>{dispatch({type: 'SAVE_NEW_RESOURCE_NAME', payload: e.target.value})}}></input>
        <br/>
        <br/>
        <label for='newResourceDescription'>Description: </label>
        <input type='text' id='newResourceDescription'></input>
        <br/>
        <br/>
        <label for='newResourceLink'>Link: </label>
        <input type='url' id='newResourceLink'></input>
        <br/>
        <br/>
        <button type='submit'>Add Resource</button>
      </form>
    </>
  );
}

export default AddResourceForm;
