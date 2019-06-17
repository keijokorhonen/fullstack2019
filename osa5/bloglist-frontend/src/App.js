import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useField } from './hooks'

function App() {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    const username = useField('text')
    const password = useField('password')

    useEffect(() => {
        blogService.getAll()
            .then(initialBlogs => setBlogs(initialBlogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const renderBlogs = () => blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
        .map(blog =>
            <Blog key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={removeBlog}
                user={user}
            />
        )

    const sendNotification = (notification) => {
        setNotification(notification)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            // setUsername('')
            // setPassword('')
        } catch (exception) {
            console.log(exception.message)
            sendNotification({ class: 'error', message: 'Wrong username or password' })
        }
    }

    const handleLogout = () => () => {
        try {
            window.localStorage.removeItem('loggedBlogappUser')

            setUser(null)

            sendNotification({ class: 'message', message: 'User logged out' })
        } catch (exception) {
            console.log(exception.message)
            sendNotification({ class: 'error', message: 'Logout was unsucessful' })
        }
    }

    const addBlog = async (blog) => {
        try {
            const returnedBlog = await blogService.create(blog)

            setBlogs(blogs.concat(returnedBlog))

            sendNotification({ class: 'message', message: `A new Blog "${returnedBlog.title}" by ${returnedBlog.author} has been added` })
        } catch (exception) {
            console.log(exception.message)
            sendNotification({ class: 'error', message: 'Blog could not be added' })
        }
    }

    const addLike = async (blog) => {
        try {
            const likedBlog = {
                user: blog.user._id,
                likes: blog.likes + 1,
                author: blog.author,
                title: blog.title,
                url: blog.url
            }

            await blogService.update(blog.id, likedBlog)
            sendNotification({ class: 'message', message: 'Liked!' })

        } catch (exception) {
            sendNotification({ class: 'error', message: 'Could not like blog' })
        }
    }

    const removeBlog = async (blog) => {
        if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
            try {
                await blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b.id !== blog.id))
                sendNotification({ class: 'message', message: 'Blog removed!' })
            } catch (exception) {
                sendNotification({ class: 'error', message: 'Blog could not be removed' })
            }
        }
    }

    if (user === null) {
        return (
            <div>
                <h2>Log in to Application</h2>
                <Notification notification={notification} />
                <LoginForm
                    handleSubmit={handleLogin}
                    username={username}
                    password={password}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification notification={notification} />
            <p>
                {`${user.name} logged in `}
                <button onClick={handleLogout()}>Logout</button>
            </p>
            <Toggleable buttonLabel="New Blog">
                <BlogForm addBlog={addBlog} />
            </Toggleable>

            {renderBlogs()}
        </div>
    )
}

export default App
