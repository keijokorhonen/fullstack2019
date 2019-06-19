import React from 'react'
import { connect } from 'react-redux'

import Filter from '../components/Filter'

import anecdoteService from '../services/anecdotes'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        props.showNotification(`You added anecdote: ${content}`)
        setTimeout(() => {
            props.hideNotification()
        }, 5000)
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
    { createAnecdote, showNotification, hideNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm