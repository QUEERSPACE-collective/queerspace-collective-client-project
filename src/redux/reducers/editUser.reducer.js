const editUserReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_EDIT_USER":
            return action.payload;
        case "CLEAR_EDIT_USER":
            return {};
        case "UPDATE_EDIT_USER":
            return {
                ...state,
                ...action.payload,
            };
        case 'SET_EDIT_PROFILE':
            return action.payload;
        case 'UPDATE_EDIT_PROFILE':
            return {
                ...state,
                ...action.payload,
            };
        case "UPDATE_MENTOR":
            return {
                ...state,
                ...action.payload,
            };
    };
    return state;
}

export default editUserReducer;