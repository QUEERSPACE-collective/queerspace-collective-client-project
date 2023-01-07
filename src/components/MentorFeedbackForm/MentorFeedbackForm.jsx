import { useEffect } from 'react';
import './MentorFeedbackForm.css';

function MentorFeedbackForm() {
    useEffect(() => {
        pageFadeIn() 
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
export default MentorFeedbackForm;