import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const { anecdotes, filter } = props.store.getState()
    const store = props.store

    const anecdotesToShow = () => {
        if (filter === '') {
            return anecdotes
        } else {
            return anecdotes.filter(anecdote =>
                anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            )
        }
    }

    const vote = (id) => {
        console.log('vote', id)
        store.dispatch(voteAnecdote(id))
        store.dispatch(showNotification(`You voted for: ${anecdotes.find(a => a.id === id).content}`))
        setTimeout(() => {
            store.dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotesToShow().sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList