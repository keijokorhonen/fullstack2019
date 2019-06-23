import blogService from '../services/blogs'
import loginService from '../services/login'

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

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN_USER',
                data: user
            })
        }
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username: username,
            password: password
        })

        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch({
            type: 'LOGOUT_USER'
        })
    }
}

export default userReducer