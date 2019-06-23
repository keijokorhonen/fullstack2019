import React from 'react'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
    const blog = props.blogs.find(b => b.id === props.id)

    if (!blog) {
        return null
    }

    const showWhenCreator = { display: blog.user.username === props.user.username ? '' : 'none' }

    const handleLike = async (event) => {
        event.preventDefault()
        try {
            const likedBlog = {
                user: blog.user._id,
                likes: blog.likes + 1,
                author: blog.author,
                title: blog.title,
                url: blog.url
            }

            await props.likeBlog(blog.id, likedBlog)
            props.setNotification('Liked!', 'message', 5)
        } catch (exception) {
            props.setNotification('Could not like blog', 'error', 5)
        }
    }

    const handleRemove = async (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
            try {
                await props.removeBlog(blog.id)
                props.setNotification('Blog removed!', 'message', 5)
            } catch (exception) {
                props.sendNotification('Blog could not be removed', 'error', 5)
            }
        }
    }

    return (
        <div>
            <h2>
                {blog.title} {blog.author}
            </h2>
            <div className="blogUrl">
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="blogLikes">
                {blog.likes} likes <button onClick={handleLike}>Like</button>
            </div>
            <div className="blogUser">
                added by {blog.user.name}
            </div>
            <div style={showWhenCreator}>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    likeBlog,
    removeBlog,
    setNotification
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog