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

export const setNotification = (notification, timeout) => {
    return async dispatch => {
        await dispatch({
            type: 'SHOW_NOTIFICATION',
            data: { notification }
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, timeout * 1000
        )
    }
}

export default notificationReducer