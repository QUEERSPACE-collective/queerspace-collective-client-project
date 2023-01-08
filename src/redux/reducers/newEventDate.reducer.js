const newEventDate = (state = '', action) => {
    switch (action.type) {
        case 'SAVE_NEW_EVENT_DATE':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return '2023-01-14'
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventDate;