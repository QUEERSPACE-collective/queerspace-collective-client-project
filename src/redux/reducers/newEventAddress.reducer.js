const newEventAddress = (state='', action) => {
    switch(action.type){
        case 'SAVE_NEW_EVENT_ADDRESS':
            return action.payload;
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }  
    return state;
}

export default newEventAddress;