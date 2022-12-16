import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Feedback.css';

function Feedback() {
    return (
     <>
        <h1>Feedback Form</h1>
            <div className='iframeDivContainer'>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfIIft7xLRtdCy4avYWFsGapBg_nDezVD_6Mnnc67HzV7Wznw/viewform"
                    className='iframeContainer'>
                </iframe>
            </div>
    </>
    )
}
export default Feedback;