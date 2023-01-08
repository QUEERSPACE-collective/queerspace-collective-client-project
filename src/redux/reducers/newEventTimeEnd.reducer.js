const newEventTimeEnd = (state = '', action) => {
    switch (action.type) {
        case 'SAVE_NEW_EVENT_TIME_END':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return '15:00';
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventTimeEnd;
