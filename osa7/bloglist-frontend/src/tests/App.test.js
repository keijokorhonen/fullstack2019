import React from 'react'
import {
    render, waitForElement
} from '@testing-library/react'
jest.mock('../services/blogs')
import App from '../App'

describe('<App />', () => {
    test('if no user logged, notes are not rendered', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(() => component.getByText('Login'))

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(0)
    })

    test('if user is logged in, notes are rendered', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
        }

        localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(() => component.getByText('New Blog'))

        const blogs = component.container.querySelectorAll('.blog')
        expect(blogs.length).toBe(6)

        const mostLikedBlog = component.container.querySelector('.blog')
        expect(mostLikedBlog).toHaveTextContent(
            'Canonical string reduction by Edsger W. Dijkstra'
        )
    })
})