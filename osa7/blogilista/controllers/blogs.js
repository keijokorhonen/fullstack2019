const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blogToBeRemoved = await Blog.findById(request.params.id)

        if (!(blogToBeRemoved.user.toString() === decodedToken.id)) {
            return response.status(401).json({ error: 'unauthorized' })
        }

        await blogToBeRemoved.delete()
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    const id = request.params.id
    const comment = request.body.comment

    try {
        const blogToUpdate = await Blog.findById(id)
        blogToUpdate.comments = blogToUpdate.comments.concat(comment)
        const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, { new: true })
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter