const newEventType = (state = [], action) => {
    switch (action.type) {
        case 'SET_NEW_EVENT_TYPE':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return state;
        case "CLEAR_NEW_EVENT_FORM":
            return state;
    }
    return state;
}

export default newEventType;