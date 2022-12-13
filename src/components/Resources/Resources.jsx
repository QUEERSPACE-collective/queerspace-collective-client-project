import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';


function Resources() {
  const history = useHistory();
  const dispatch = useDispatch();
  const viewResources = useSelector(store=>store.viewResources);

  useEffect(()=>{
    dispatch({
      type: 'GET_RESOURCES'
    });
  },[])

  return (
    <>
    <div className="container">
      <h1>Resources</h1>
    </div>
    <div>
      <ul>
        {viewResources.length > 0 && viewResources[0].map((resource)=>
          <li key={resource.id}>
             <p>{resource.resourceName}</p>
             <p>{resource.resourceDescription}</p>
             <a href={resource.resourceLink}>View Resource</a>
             <br/>
          </li>
        )}
      </ul>
    </div>
    </>
  );
}

export default Resources;
