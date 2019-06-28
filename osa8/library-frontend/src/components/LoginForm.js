import React, { useState } from 'react'

const LoginForm = (props) => {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (event) => {
        event.preventDefault()

        try {
            const result = await props.login({
                variables: { username, password }
            })

            const token = result.data.login.value

            props.setToken(token)
            localStorage.setItem('library-user-token', token)
            props.redirectToHome()
        } catch (error) {
            props.handleError(error)
        }
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label>username</label>
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm