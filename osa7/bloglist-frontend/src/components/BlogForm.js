import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Input = styled.input`
    padding: 1em;
    margin: 0.5em;
    color: #000000;
    background: #d5ddea;
    border: none;
    border-radius: 3px;
`

const Button = styled.button`
    background: #368785;
    border-radius: 3px;
    padding: 1em;
    color: #ffffff;
    border: none;
    margin-top: 1em;
    margin-bottom: 1em;

    &:hover {
            background-color: #26605f;
    }
`

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
                <label>Title:</label>
                <Input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label>Author:</label>
                <Input
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label>Url:</label>
                <Input
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <Button type="submit">Create</Button>
        </form>
    )
}

export default connect(null, { createBlog, setNotification })(BlogForm)