
const newEventTimeEnd = (state='', action) => {
    switch(action.type){
        case 'SAVE_NEW_EVENT_TIME_END':
            return action.payload;
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventTimeEnd;
