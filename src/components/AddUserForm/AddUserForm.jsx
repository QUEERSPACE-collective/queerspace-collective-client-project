import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddUserForm.css';

// CUSTOM COMPONENTS

function AddUserForm() {
  
  function handleSubmit() {
    console.log('yo')
  }
  return (

   <>
      <h1>Add New User</h1>

      <form className='addUserFormContainer'>
      <label for='email' name='email'>   
      Add Email:  
      </label>
      <input type='email' id='email' placeholder='email'></input>
      <button onSubmit={handleSubmit}>Add User</button>
      </form>
   </>
    
  );
}

export default AddUserForm;