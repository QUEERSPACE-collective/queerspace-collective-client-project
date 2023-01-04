const registrationAnswers = (state = [], action) => {
    switch (action.type) {
        case 'STORE_USER_ANSWER':
            return action.payload;
        default: 
            return state
    }
}

export default registrationAnswers;