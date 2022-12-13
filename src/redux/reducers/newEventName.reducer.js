const newEventName = (state='', action) => {
    switch(action.type){
        case 'SAVE_NEW_EVENT_NAME':
            return action.payload;
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventName;