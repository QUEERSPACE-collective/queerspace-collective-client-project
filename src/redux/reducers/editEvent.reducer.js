const editEventReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_EDIT_EVENT":
            return action.payload;
        case "UPDATE_EDIT_EVENT":
            return {
                ...state,
                ...action.payload,
            };
    };
    return state;
}

export default editEventReducer;