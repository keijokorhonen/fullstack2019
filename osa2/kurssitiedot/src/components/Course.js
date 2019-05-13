import React from 'react';


const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    const parts = () => props.parts.map((part, i) =>
        <Part part={part.name} exercises={part.exercises} key={i}/>
    )

    return (
        <div>
            {parts()}
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.map(part => part.exercises).reduce((s, p) =>  s + p)

    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course