const newEventTime = (state='', action) => {
    switch(action.type){
        case 'SAVE_NEW_EVENT_TIME':
            return action.payload;
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventTime