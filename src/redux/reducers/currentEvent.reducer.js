const currentEvent = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_DETAILS':
            return action.payload        
        default: 
            return state
    }
}

export default currentEvent;



