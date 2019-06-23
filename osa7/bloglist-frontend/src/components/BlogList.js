import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
    return (
        props.blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map(blog =>
                <div key={blog.id} className="blog blogTitleButton">
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                    </Link>
                </div>

            )
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const ConnectedBlogs = connect(mapStateToProps)(BlogList)

export default ConnectedBlogs