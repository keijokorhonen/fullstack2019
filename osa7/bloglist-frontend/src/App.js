import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom'
import styled from 'styled-components'

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

    const Main = styled.div`
        margin-left: 11%;
        margin-right: 11%;
    `

    return (
        <div>
            <Router>
                <NavBar user={props.user} handleLogout={handleLogout} />
                <Main>
                    <h1>Blogs</h1>
                    <Notification />
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/users" render={() => <Users />} />
                    <Route path="/users/:id" render={({ match }) =>
                        <User id={match.params.id} />
                    } />
                    <Route path="/blogs/:id" render={({ match }) =>
                        <Blog id={match.params.id} />
                    } />
                </Main>
            </Router>
        </div>
    )
}

const StyledNavBar = styled.div`
    background-color: #368785;
    padding: 15px;
    border-radius: 0px 0px 3px 3px;
    display: flex;
    justify-content: space-between;
    margin-left: 10%;
    margin-right: 10%;

    @media screen and (max-width: 600px) {
        margin-left: 0px;
        margin-right: 0px;
    }
`

const StyledMenu = styled.div`
    display: flex;
    justify-content: space-around;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 8px 1.2em 8px 1.2em;
    color: #ffffff;
    border-radius: 3px;

    &:hover {
        background-color: #26605f;
    }
`

const LoggedInMessage = styled.div`
    justify-content: flex-end;
    padding: 8px;
    color: #ffffff;
`

const NavBar = (props) => {
    return (
        <StyledNavBar>
            <StyledMenu>
                <StyledLink to="/">Blogs</StyledLink>
                <StyledLink to="/users">Users</StyledLink>
            </StyledMenu>

            <LoggedInMessage>
                {`${props.user.name} `}
                <button onClick={props.handleLogout}>Logout</button>
            </LoggedInMessage>
        </StyledNavBar>
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
