import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const MostVotes = ({votes}) => {
    let mostVoted = votes[0]
    let mostVotedIndex = votes[0]
    for (let i = 1; i < votes.length; i++) {
        if (votes[i] > mostVoted) {
            mostVoted = votes[i]
            mostVotedIndex = i
        }
    }

    return (
        <div>
            <p>{anecdotes[mostVotedIndex]}</p>
            <p>has {mostVoted} votes</p>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

    const randomSelected = () => () => (
        setSelected(Math.floor(Math.random()*anecdotes.length))
    )

    const addVoteCount = () => () => {
        const copy = [...votes]
        copy[selected] += 1
        setVote(copy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <Button text='vote' handleClick={addVoteCount()}/>
            <Button text='next anecdote' handleClick={randomSelected()}/>
            <h1>Anecdote with most votes</h1>
            <MostVotes votes={votes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)