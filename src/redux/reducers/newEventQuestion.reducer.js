const newEventQuestion = (state='',action) => {
    switch(action.type){
        case 'SAVE_NEW_EVENT_QUESTION':
            return action.payload;
        case 'STORE_NEW_EVENT_QUESTION':
            return '';
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventQuestion;