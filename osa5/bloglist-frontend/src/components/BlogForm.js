import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        await addBlog(blogObject)

        setTitle('')
        setAuthor('')
        setUrl('')
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

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default BlogForm