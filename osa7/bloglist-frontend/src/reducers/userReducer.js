import blogService from '../services/blogs'

const initialState = null

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }
}

export const loginUser = (user) => {
    return async dispatch => {
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT_USER'
        })
    }
}

export default userReducer