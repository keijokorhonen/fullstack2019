import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const sum = good + neutral + bad

    const average = () => (good - bad)/sum

    const positives = () => good/sum*100

    if (sum === 0) {
        return (
            <div>
                Ei yhtään palautetta annettu
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic text='hyvä' value={good}/>
                    <Statistic text='neutraali' value={neutral}/>
                    <Statistic text='huono' value={bad}/>
                    <Statistic text='yhteensä' value={sum}/>
                    <Statistic text='keskiarvo' value={average()}/>
                    <Statistic text='positiivisia' value={positives().toString().concat(' %')}/>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>anna palautetta</h1>
            <Button handleClick={() => setGood(good + 1)} text='hyvä'/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutraali'/>
            <Button handleClick={() => setBad(bad + 1)} text='huono'/>
            <h1>statistiikka</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)