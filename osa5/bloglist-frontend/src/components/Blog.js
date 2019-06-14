import React, { useState } from 'react'

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
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={handleLike}>Like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        <div style={showWhenCreator}>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>

    </div>
  )
}

export default Blog