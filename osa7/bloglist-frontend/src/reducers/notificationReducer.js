const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data.notification
        case 'HIDE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const setNotification = (message, type, timeout) => {
    return async dispatch => {
        await dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                notification: { message, type, timeout }
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, timeout * 1000)
    }
}

export default notificationReducer