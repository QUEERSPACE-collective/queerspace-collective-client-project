const newEventVolunteer = (state = false, action) => {
    switch (action.type) {
        case 'SET_VOLUNTEERS_TRUE':
            return true;
        case 'EVENT_FORM_FILLER':
            return false;
        case 'SET_VOLUNTEERS_FALSE':
            return false;
    }
    return state;
}

export default newEventVolunteer;