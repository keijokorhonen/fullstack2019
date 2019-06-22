import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


describe('<Blog />', () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7,
        url: 'https://reactpatterns.com/',
        user: {
            name: 'keijo',
            username: 'keijo'
        }
    }

    test('renders title and author', () => {
        const component = render(
            <Blog blog={blog} addLike={() => null} removeBlog={() => null} user={{ username: 'keijo' }} />
        )

        const blogTitleButton = component.container.querySelector('.blogTitleButton')
        expect(blogTitleButton).toHaveTextContent(
            'React patterns by Michael Chan'
        )
    })

    test('renders full blog info after click', () => {
        const component = render(
            <Blog blog={blog} addLike={() => null} removeBlog={() => null} user={{ username: 'keijo' }} />
        )

        const blogTitleButton = component.container.querySelector('.blogTitleButton')
        fireEvent.click(blogTitleButton)

        const blogUrl = component.container.querySelector('.blogUrl')
        expect(blogUrl).toHaveTextContent(
            'https://reactpatterns.com/'
        )

        const blogLikes = component.container.querySelector('.blogLikes')
        expect(blogLikes).toHaveTextContent(
            '7 likes'
        )

        const blogUser = component.container.querySelector('.blogUser')
        expect(blogUser).toHaveTextContent(
            'added by keijo'
        )
    })
})
