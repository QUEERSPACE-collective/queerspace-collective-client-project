const newEventVolunteerMax = (state = 0, action) => {
    switch (action.type) {
        case 'SET_NEW_EVENT_VOLUNTEER_MAX':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return 0;
        case 'CLEAR_NEW_EVENT_FORM':
            return 0;
    }
    return state;
}

export default newEventVolunteerMax;