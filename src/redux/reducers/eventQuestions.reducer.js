const eventQuestions = (state = [], action) => {
    console.log('state in event questions reducer is', state)
    switch (action.type) {
        case 'SET_EVENT_QUESTIONS':
            return action.payload;
        case 'STORE_USER_ANSWER':
            return state.map(question => {
                if (question.id === action.payload.questionId) {
                    return { ...question, answer: action.payload.answer }
                }
                else {
                    return question
                }
            })
        default:
            return state
    }
}

export default eventQuestions;