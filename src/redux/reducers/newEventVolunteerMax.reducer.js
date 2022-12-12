const newEventVolunteerMax = (state=0, action)=>{
    switch(action.type){
        case 'SET_NEW_EVENT_VOLUNTEER_MAX':
            return action.payload;
        case 'SUBMIT_NEW_EVENT':
            return 0;
    }
    return state;
}

export default newEventVolunteerMax;