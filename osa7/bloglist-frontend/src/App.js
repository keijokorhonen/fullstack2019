import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'

import loginService from './services/login'

import { useField } from './hooks'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/userReducer'

function App(props) {
    const username = useField('text')
    const password = useField('password')

    useEffect(() => {
        props.initializeBlogs()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            props.loginUser(user)
        }
        // eslint-disable-next-line
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.props().value,
                password: password.props().value
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            props.loginUser(user)
            username.reset()
            password.reset()
        } catch (exception) {
            console.log(exception.message)
            props.setNotification('Wrong username or password', 'error', 5)
        }
    }

    const handleLogout = () => () => {
        try {
            window.localStorage.removeItem('loggedBlogappUser')

            props.logoutUser(null)
            props.setNotification('User logged out', 'message', 5)
        } catch (exception) {
            console.log(exception.message)
            props.setNotification('Logout was unsucessful', 'error', 5)
        }
    }


    if (props.user === null) {
        return (
            <div>
                <h2>Log in to Application</h2>
                <Notification />
                <LoginForm
                    handleSubmit={handleLogin}
                    username={username.props()}
                    password={password.props()}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification />
            <p>
                {`${props.user.name} logged in `}
                <button onClick={handleLogout()}>Logout</button>
            </p>
            <Toggleable buttonLabel="New Blog">
                <BlogForm />
            </Toggleable>

            <BlogList />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { initializeBlogs, setNotification, loginUser, logoutUser })(App)
