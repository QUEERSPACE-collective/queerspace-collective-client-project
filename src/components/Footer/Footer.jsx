import React from 'react';
import './Footer.css';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';


function Footer() {
  const user = useSelector((store) => store.user);

  return (
    <footer className='myFooter'>
      <div className="allusersBackBtn">
        {user.id && (
          <Button
            variant='contained'
            size='small'
            onClick={() => { window.history.back(-1); { pageFadeIn() } }}> ← Back
          </Button>
        )}
      </div>
      <div className="trademark">
        &copy; QUEERSPACE collective
      </div>
    </footer>
  );
};

export default Footer;
