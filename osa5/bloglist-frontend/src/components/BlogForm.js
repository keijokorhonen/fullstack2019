import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        
        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        blogService
        .create(blogObject)
        .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
        })
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm