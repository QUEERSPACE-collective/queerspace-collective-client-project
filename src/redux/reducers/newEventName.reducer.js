const newEventName = (state = '', action) => {
    switch (action.type) {
        case 'SAVE_NEW_EVENT_NAME':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return 'Iceskating on Lake Harriet';
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventName;