import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: title,
                author: author,
                url: url
            }

            const returnedBlog = await blogService.create(blogObject)

            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')

            setNotification({ class: 'message', message: `A new Blog "${blogObject.title}" by ${blogObject.author} has been added` })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            console.log(exception)
            setNotification({ class: 'error', message: 'Blog could not be added' })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    return (
        <form onSubmit={addBlog}>
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

export default BlogForm