import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    const heading = component.container.querySelector('.heading')
    expect(heading).toHaveTextContent(
        'React patterns Michael Chan'
    )

    const likes = component.container.querySelector('.likes')
    expect(likes).toHaveTextContent(
        'blog has 7 likes'
    )

})

test('clicking like button twice calls event handler twice', () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)

})