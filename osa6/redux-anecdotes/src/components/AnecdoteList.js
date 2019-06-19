import React from 'react'
import { connect } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const vote = (id) => {
        console.log('vote', id)
        props.voteAnecdote(id)
        props.showNotification(`You voted for: ${props.anecdotesToShow.find(a => a.id === id).content}`)
        setTimeout(() => {
            props.hideNotification()
        }, 5000)
    }

    return (
        <div>
            {props.anecdotesToShow.sort((a, b) => b.votes - a.votes)
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

const anecdotesToShow = ({ anecdotes, filter }) => {
    if (filter === '') {
        return anecdotes
    } else {
        return anecdotes.filter(anecdote =>
            anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotesToShow: anecdotesToShow(state)
    }
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    { voteAnecdote, showNotification, hideNotification }
)(AnecdoteList)

export default ConnectedAnecdotes