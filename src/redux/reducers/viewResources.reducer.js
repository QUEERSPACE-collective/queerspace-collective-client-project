const viewResources = (state = [], action) => {
    switch (action.type) {
        case 'STORE_RESOURCES':
            return [
                ...state,
                action.payload
            ];
    }
    return state;
}

export default viewResources;