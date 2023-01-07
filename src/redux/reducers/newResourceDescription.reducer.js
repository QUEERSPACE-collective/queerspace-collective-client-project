const newResourceDescription = (state = '', action) => {
    switch (action.type) {
        case 'SAVE_NEW_RESOURCE_DESCRIPTION':
            return action.payload;
        case 'CLEAR_NEW_RESOURCE_FORM':
            return '';
    }
    return state;
}

export default newResourceDescription;