import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledBlog = styled.div`
        display: table;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 15px;
        background-color: #ba2746;
        border-radius: 3px;
        cursor: pointer;
        font-size: 18px;
        transition-duration: .3s;

        &:hover {
            background-color: #e0506f;
        }
`
const StyledLink = styled(Link)`
        text-decoration: none;
        color: #ffffff;
`

const BlogList = (props) => {
    return (
        props.blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map(blog =>
                <StyledBlog key={blog.id}>
                    <StyledLink to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                    </StyledLink>
                </StyledBlog>

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