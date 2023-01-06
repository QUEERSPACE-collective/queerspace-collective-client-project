import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Resources() {
  const history = useHistory();
  const dispatch = useDispatch();
  const viewResources = useSelector(store=>store.viewResources);
  const user = useSelector(store=>store.user);
  useEffect(()=>{
    animater(),
    dispatch({
      type: 'GET_RESOURCES'
    });
  },[])

//Fade effect
function animater() {
  document.body.classList.remove("noSalmon");
  document.body.classList.add("salmon");
  setTimeout(() => document.body.classList.remove("salmon"), 100);
  setTimeout(() => document.body.classList.add("noSalmon"), 100);
}
//Fade effect

  return (
    <>
    <div className="container">
      <h1 className='bannerTop'>Resources</h1>
    </div>
    <br/>
    {user && user.userType == 5 ? (<button onClick={()=>{history.push}}>Add a resource</button>): (<div></div>)}
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
    </>
  );
}

export default Resources;
