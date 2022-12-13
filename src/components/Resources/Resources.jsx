import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';


function Resources() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
    <div className="container">
      <h1>Resources</h1>
    </div>
    <div>
      
    </div>
    </>
  );
}

export default Resources;
