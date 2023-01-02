import React from 'react';
import './Footer.css';
import { useHistory, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import {useSelector} from 'react-redux';

// Add Social Media links?
 
function Footer() {
  const history = useHistory();
  const user = useSelector((store) => store.user);

  return (
    <footer className='myFooter'>
      <div className="allusersBackBtn">
        {user.id &&(
          <Button 
            variant='contained'
            size='small'
            onClick={()=>{window.history.back(-1); {animater()}} }> ← Back</Button>
        )}
      </div>
      <div className="trademark">
        &copy; QUEERSPACE collective
      </div>  
  </footer>
  );
};

export default Footer;
