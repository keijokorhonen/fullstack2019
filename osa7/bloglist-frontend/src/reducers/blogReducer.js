import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return [...state, action.data]
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data.id)
        case 'LIKE_BLOG': {
            const blogToLike = state.find(b => b.id === action.data.id)
            const changedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
            return state.map(b => b.id !== action.data.id ? b : changedBlog)
        }
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: { id }
        })
    }
}

export const likeBlog = (id, likedBlog) => {
    return async dispatch => {
        await blogService.update(id, likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: { id }
        })
    }
}

export default blogReducer