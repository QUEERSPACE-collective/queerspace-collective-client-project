import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          This is currently the landing page, should be converted to the user's profile page 
          if logged in, otherwise to the login page.
          </p>

        </div>
        {/* <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div> */} 
        
        {/* This registerForm can be reused for the Admin, but the user won't need it.
        The other option is to have it be the page that the user gets redirected to when
        they click their email link, so they can then update their information */}

      </div>
    </div>
  );
}

export default LandingPage;
