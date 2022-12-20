const eventReducerSpecific = (state = [], action) => {

    switch (action.type) {
        case 'SET_SPECIFIC':
            return action.payload;
        default: 
            return state
    }
}


export default eventReducerSpecific;
