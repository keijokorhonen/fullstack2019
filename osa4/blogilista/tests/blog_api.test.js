const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some notes saved', () => {


    beforeEach(async () => {
        await Blog.remove({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blogs contain field called id', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Top JavaScript VSCode Extensions for Faster Development',
            author: 'Arfat Salman',
            url: 'https://codeburst.io/top-javascript-vscode-extensions-for-faster-development-c687c39596f5',
            likes: 6
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body.length).toBe(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.body.map(blog => blog.title)
        expect(titles).toContain(
            'Top JavaScript VSCode Extensions for Faster Development'
        )
    })

    test('undefined likes are set to zero', async () => {
        const newBlog = {
            title: 'Top JavaScript VSCode Extensions for Faster Development',
            author: 'Arfat Salman',
            url: 'https://codeburst.io/top-javascript-vscode-extensions-for-faster-development-c687c39596f5'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('invalid blog requests are responded to with bad request', async () => {
        const newBlogWithoutTitle = {
            author: 'Arfat Salman',
            url: 'https://codeburst.io/top-javascript-vscode-extensions-for-faster-development-c687c39596f5',
            likes: 6
        }

        const newBlogWithoutURL = {
            title: 'Top JavaScript VSCode Extensions for Faster Development',
            author: 'Arfat Salman',
            likes: 6
        }

        await api
            .post('/api/blogs')
            .send(newBlogWithoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlogWithoutURL)
            .expect(400)
    })

    test('specified blogs can be removed', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await api.get('/api/blogs')

        expect(blogsAtEnd.body.length).toBe(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.body.map(blog => blog.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('blog can be updated', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = { ...blogsAtStart.body[0], likes: blogsAtStart.body[0].likes + 1 }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await api.get('/api/blogs')

        expect(blogsAtEnd.body.length).toBe(helper.initialBlogs.length)

        const updatedBlog = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id)
        expect(updatedBlog.likes).toBe(blogToUpdate.likes)
    })
})


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'kkorhonen',
            name: 'Keijo Korhonen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})