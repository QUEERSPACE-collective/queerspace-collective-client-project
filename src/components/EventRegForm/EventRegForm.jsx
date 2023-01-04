import React from 'react';
import './EventRegForm.css';

function EventRegForm() {
  
function handleSubmit() {
  console.log('yo');
}
  return (
<>
    <h1 className='bannerTop'>EventRegForm</h1>
    
      <h1>Register For Event</h1>
    <form onSubmit={handleSubmit}>
      <div>
      <label>Question 1*</label>
      <br></br>
      <input type='text' placeholder='We will map thru the'>
      </input>
      </div>

      <div>
      <label>Question 2*</label>
      <br></br> 
      <input type='text' placeholder='questions the admin'>
      </input>
      </div>

      <div>
      <label>Question 3*</label>
      <br></br>
      <input type='text' placeholder='entered 4 this event'>
      </input>
      </div>

      <button type='submit'>Submit</button>
    </form>
</>  
  );
}

export default EventRegForm;