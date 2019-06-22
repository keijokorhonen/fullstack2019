import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useField } from './hooks'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

function App (props) {
    const [user, setUser] = useState(null)

    const username = useField('text')
    const password = useField('password')

    useEffect(() => {
        props.initializeBlogs()
    }, [props])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
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
            blogService.setToken(user.token)
            setUser(user)
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

            setUser(null)

            props.setNotification('User logged out', 'message', 5)
        } catch (exception) {
            console.log(exception.message)
            props.setNotification('Logout was unsucessful', 'error', 5)
        }
    }

    if (user === null) {
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
                {`${user.name} logged in `}
                <button onClick={handleLogout()}>Logout</button>
            </p>
            <Toggleable buttonLabel="New Blog">
                <BlogForm />
            </Toggleable>

            <BlogList user={user} />
        </div>
    )
}

export default connect(null, { initializeBlogs, setNotification })(App)
