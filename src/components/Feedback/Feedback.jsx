import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Feedback.css';

function Feedback() {
    useEffect(() => {
        animater() // Call fade effect
      }, [])
    
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
        <h1 className='bannerTop'>Feedback Form</h1>
            <div className='iframeDivContainer'>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfIIft7xLRtdCy4avYWFsGapBg_nDezVD_6Mnnc67HzV7Wznw/viewform"
                    className='iframeContainer'>
                </iframe>
            </div>
        </>
    );
};
export default Feedback;