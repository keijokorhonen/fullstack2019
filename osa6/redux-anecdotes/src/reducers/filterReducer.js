const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data.query
        default:
            return state
    }
}

export const filterChange = (query) => {
    return {
        type: 'FILTER',
        data: { query }
    }
}

export default filterReducer