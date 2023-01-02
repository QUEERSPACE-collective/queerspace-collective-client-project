const editEventReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_EDIT_EVENT":
            return action.payload;
        case "CLEAR_EDIT_EVENT":
            return {};
        case "UPDATE_EDIT_EVENT":
            return {
                ...state,
                ...action.payload,
            };
    };
    return state;
}

export default editEventReducer;