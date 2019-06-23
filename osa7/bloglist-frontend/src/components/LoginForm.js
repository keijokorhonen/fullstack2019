import React from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const username = props.usernameField.props().value
            const password = props.passwordField.props().value

            await props.loginUser(username, password)
            props.usernameField.reset()
            props.passwordField.reset()
        } catch (exception) {
            console.log(exception.message)
            props.setNotification('Wrong username or password', 'error', 5)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username&nbsp;
                    <input {...props.usernameField.props()} />
                </div>
                <div>
                    Password&nbsp;
                    <input {...props.passwordField.props()} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default connect(null, { loginUser, setNotification })(LoginForm)