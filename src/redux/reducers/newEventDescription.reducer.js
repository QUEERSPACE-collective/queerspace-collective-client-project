const newEventDescription = (state='', action)=>{
    switch(action.type){
        case 'SET_NEW_EVENT_DESCRIPTION':
            return action.payload;
        case 'EVENT_FORM_FILLER':
            return 'Since this went so well last time, we\’ve decided to have another ice skating get together on Lake Harriet!'

        case 'CLEAR_NEW_EVENT_FORM':
            return '';
    }
    return state;
}

export default newEventDescription;