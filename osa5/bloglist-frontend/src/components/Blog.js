import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => () => {
    setExpanded(!expanded)
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
          {blog.likes} likes <button>Like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
      </div>

    </div>
  )
}

export default Blog