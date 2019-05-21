import React from 'react';

const Person = (props) => {
    return (
        <p>{props.name} {props.number} 
        <button onClick={props.removePerson}>poista</button></p>
    )
}

const Persons = (props) => {
    const personList = () => props.personsToShow.map(person =>
        <Person name={person.name} number={person.number} removePerson={() => props.removePerson(person.id)} key={person.name}/>
    )

    return (
        <div>{personList()}</div>
    )
}

export default Persons