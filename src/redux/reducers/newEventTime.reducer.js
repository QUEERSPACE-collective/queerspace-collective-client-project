const newEventTime = (state = '', action) => {
    switch (action.type) {
        case 'SAVE_NEW_EVENT_TIME':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return '12:00';
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventTime