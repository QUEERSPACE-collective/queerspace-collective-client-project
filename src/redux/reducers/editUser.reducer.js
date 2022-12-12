const editUserReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_EDIT_USER":
            return action.payload;
        case "UPDATE_EDIT_USER":
            return {
                ...state,
                ...action.payload,
            };
    };
    return state;
}

export default editUserReducer;