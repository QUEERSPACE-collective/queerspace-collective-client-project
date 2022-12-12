const eventReducer = (state = [], action) => {
    console.log('in event reducer')
    switch (action.type) {
        case 'SET_EVENTS':
            return action.payload;
        default: 
            return state
    }
}

export default eventReducer;