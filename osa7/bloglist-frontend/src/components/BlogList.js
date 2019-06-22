import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'

const BlogList = (props) => {
    return (
        props.blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                />
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