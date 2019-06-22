import React, { useState } from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const blog = {
                title: title,
                author: author,
                url: url
            }
            await props.createBlog(blog)

            setTitle('')
            setAuthor('')
            setUrl('')

            props.setNotification(`A new Blog "${blog.title}" by ${blog.author} has been added`, 'message', 5)
        } catch (exception) {
            console.log(exception.message)
            props.setNotification('Blog could not be added', 'error', 5)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Title:&nbsp;
                <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:&nbsp;
                <input
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                Url:&nbsp;
                <input
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default connect(null, { createBlog, setNotification })(BlogForm)