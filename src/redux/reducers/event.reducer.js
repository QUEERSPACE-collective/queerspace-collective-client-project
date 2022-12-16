const eventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            // action.payload.forEach(attendees => {
            //    attendees.attendees = 3 
            // })
            // console.log('actionpayload', action.payload)
            return action.payload;
        // case 'SET_TOTAL_ATTENDEES':
        //     let newArray =[...{state}, ...action.payload]
        //     console.log('new array is!!!!!', newArray)
        //     return newArray
        default: 
            return state
    }
}


export default eventReducer;
