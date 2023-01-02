const eventQuestions = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_QUESTIONS':
            return action.payload;
        default: 
            return state
    }
}


export default eventQuestions;