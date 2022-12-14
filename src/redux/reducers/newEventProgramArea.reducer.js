const newEventProgramArea = (state = 1, action) => {
    switch (action.type) {
        case 'SET_NEW_EVENT_PROGRAM_AREA':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return 1;
        case 'CLEAR_NEW_EVENT_FORM':
            return 1;
    }
    return state;
}

export default newEventProgramArea;