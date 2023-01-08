import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';


function Resources() {
  const history = useHistory();
  const dispatch = useDispatch();
  const viewResources = useSelector(store => store.viewResources);
  const user = useSelector(store => store.user);
  useEffect(() => {
    pageFadeIn(),
      dispatch({
        type: 'GET_RESOURCES'
      });
  }, [])

  //Fade effect
  function pageFadeIn() {
    document.body.classList.remove("withOpacity");
    document.body.classList.add("noOpacity");
    setTimeout(() => document.body.classList.remove("noOpacity"), 100);
    setTimeout(() => document.body.classList.add("withOpacity"), 100);
  }

  return (
    <>
<<<<<<< HEAD
    <div className="container">
      <h1 className='bannerTop'>Resources</h1>
    </div>
    <br/>

    {user && user.userType == 5 ? (<Button 
    variant='contained' sx = {{bgcolor: '#f39536', fontWeight: 'bold', wordSpacing: 1,                 
    '&:hover': {
      backgroundColor: '#f39536',
      boxShadow: '6px 6px 0px #e2bf05'
    },}}
    onClick={()=>{history.push('/addresourceform')}}>
      Add a resource
      </Button>): 
      (<div></div>)}
    <br/>
    <br/>
    <div>
      <ul>
        {viewResources.length > 0 && viewResources[0].map((resource)=>
          <li key={resource.id}>
             <p>{resource.resourceName}</p>
             <p>{resource.resourceDescription}</p>
             <a href={resource.resourceLink}>View Resource</a>
             <br/>
             <br/>
          </li>
        )}
      </ul>
    </div>
=======
      <div className="container">
        <h1 className='bannerTop'>Resources</h1>
      </div>
      <br />
      {user && user.userType == 5 ? (<button onClick={() => { history.push('/addresourceform') }}>Add a resource</button>) : (<div></div>)}
      <br />
      <br />
      <div>
        <ul>
          {viewResources.length > 0 && viewResources[0].map((resource) =>
            <li key={resource.id}>
              <p>{resource.resourceName}</p>
              <p>{resource.resourceDescription}</p>
              <a href={resource.resourceLink}>View Resource</a>
              <br />
              <br />
            </li>
          )}
        </ul>
      </div>
>>>>>>> main
    </>
  );
}

export default Resources;
