const newEventAddress = (state='', action) => {
    switch(action.type){
        case 'SAVE_NEW_EVENT_ADDRESS':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return '4525 Upton Ave S, Minneapolis, MN 55410';
        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }  
    return state;
}

export default newEventAddress;