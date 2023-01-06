const newEventAttendeeMax = (state=0, action)=>{
    switch(action.type){
        case 'SET_NEW_EVENT_ATTENDEE_MAX':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return 50;
        case 'CLEAR_NEW_EVENT_FORM':
            return 0;
    }
    return state;
}

export default newEventAttendeeMax;