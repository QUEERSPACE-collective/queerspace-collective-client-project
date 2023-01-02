// import React, { useState, useEffect } from 'react';
// import './AboutPage.css';
// import { useHistory, useParams } from 'react-router-dom';

// import { useDispatch, useSelector } from 'react-redux';
// import { Query } from 'pg';

// // This is one of our simplest components
// // It doesn't have local state,
// // It doesn't dispatch any redux actions or display any part of redux state
// // or even care what the redux state is'

// function AboutPage() {
//   const allUsersList = useSelector(store => store.allUsers);
//   const user = useSelector((store) => store.user);
//   const params = useParams();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const [count, setCount] = useState(260000);
  
//   function startCount() {   
//   setInterval(() => {
//       setCount(count => count - 1);
//     }, 1000);
//   }

//   return (
//     <>
//     <h1>
//       {count}
//      </h1>
//      <button onClick={startCount}>Send email</button>
//   </>
//   );
// }

// // CLIENT SIDE CODE

// if (count <= 0 && user.password == password) {
//   dispatch({
//     type: "DELETE_UNCHANGED_PASSWORD",
//     payload: {
//       id: user.id
//     }
//   })
// }

// // If {user.id && !user.password} {alert('you must request a new password from admin')}

// // CLIENT SIDE

// // SERVER SIDE
//   // Server waits for countdown in the client to reach 0;
  
//   // DELETE "password" WHERE "user"."id" = $1; 

// // SERVER SIDE
// export default AboutPage;
