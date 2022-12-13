const newEventDescription = (state='', action)=>{
    switch(action.type){
        case 'SET_NEW_EVENT_DESCRIPTION':
            return action.payload;
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventDescription;