const newEventStoredQuestions = (state=[], action) => {
    switch(action.type){
        case 'STORE_NEW_EVENT_QUESTION':
            return [
                ...state, 
                action.payload
            ];
        case 'CLEAR_NEW_EVENT_FORM':
            return [];
        
        }
    return state;
}

export default newEventStoredQuestions;