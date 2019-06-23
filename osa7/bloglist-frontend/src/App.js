import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
} from 'react-router-dom'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import { useField } from './hooks'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

function App(props) {
    const usernameField = useField('text')
    const passwordField = useField('password')

    useEffect(() => {
        props.initializeBlogs()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        props.initializeUser()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        props.initializeUsers()
        // eslint-disable-next-line
    }, [])

    const handleLogout = async () => {
        try {
            await props.logoutUser(null)
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
                <LoginForm usernameField={usernameField} passwordField={passwordField} />
            </div>
        )
    }

    return (
        <div>
            <Router>
                <div>
                    <Link to="/">Blogs</Link>
                    <Link to="/users">Users</Link>

                    {`${props.user.name} logged in `}
                    <button onClick={handleLogout}>Logout</button>

                </div>
                <h2>Blogs</h2>
                <Notification />
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/users" render={() => <Users />} />
                <Route path="/users/:id" render={({ match }) =>
                    <User id={match.params.id} />
                } />
                <Route path="/blogs/:id" render={({ match }) =>
                    <Blog id={match.params.id} />
                } />
            </Router>
        </div>
    )
}

const Home = () => (
    <div>
        <Toggleable buttonLabel="New Blog">
            <BlogForm />
        </Toggleable>
        <BlogList />
    </div>
)

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { initializeBlogs, setNotification, initializeUser, loginUser, logoutUser, initializeUsers })(App)
