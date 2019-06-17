import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
    const [expanded, setExpanded] = useState(false)

    const showWhenExpanded = { display: expanded ? '' : 'none' }
    const showWhenCreator = { display: blog.user.username === user.username ? '' : 'none' }

    const toggleExpanded = () => () => {
        setExpanded(!expanded)
    }

    const handleLike = async (event) => {
        event.preventDefault()
        blog.likes = blog.likes + 1
        await addLike(blog)
    }

    const handleRemove = async (event) => {
        event.preventDefault()
        await removeBlog(blog)
    }

    return (
        <div className="blog">
            <div onClick={toggleExpanded()} className="blogTitleButton">
                {blog.title} by {blog.author}
            </div>
            <div style={showWhenExpanded}>
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

        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog