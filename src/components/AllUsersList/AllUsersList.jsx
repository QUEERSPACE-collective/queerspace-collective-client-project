import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllUsersList.css';

// CUSTOM COMPONENTS

// On page load, GET all users


function AllUsersList() {
  const dispatch = useDispatch();
  const allUsersList = useSelector(store => store.allUsers);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, [])


  return (
    <div>
    <h1>AllUsersList</h1>
    </div>
    
  );
}

export default AllUsersList;