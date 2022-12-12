const newEventType = (state=1, action)=>{
    switch(action.type){
        case 'SET_NEW_EVENT_TYPE':
            return action.payload;
        case "SUBMIT_NEW_EVENT":
            return 1;
    }
    return state;
}

export default newEventType;