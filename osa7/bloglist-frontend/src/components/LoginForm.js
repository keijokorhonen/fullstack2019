import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    username,
    password
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username&nbsp;
                    <input {...username} />
                </div>
                <div>
                    Password&nbsp;
                    <input {...password} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
}

export default LoginForm