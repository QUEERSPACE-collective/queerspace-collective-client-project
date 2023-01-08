const eventRegisteredUsers = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_REGISTERED_USERS':
            return action.payload;
        default:
            return state
    }
}

export default eventRegisteredUsers;