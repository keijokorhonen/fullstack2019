import React from 'react'
import { connect } from 'react-redux'

import Filter from '../components/Filter'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`You added anecdote: ${content}`, 5)
    }
    return (
        <div>
            <Filter />
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const ConnectedAnecdoteForm = connect(
    null,
    { createAnecdote, setNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm