import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState(null)
    const [messageClass, setMessageClass] = useState(null)

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        let found = false
        let id
        persons.forEach(person => {
            if (person.name === newName) {
                found = true
                id = person.id
            }
        })

        if (found) {
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                personsService
                    .update(id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setMessage(`Vaihdettiin henkilön ${returnedPerson.name} numero`)
                        setMessageClass('message')
                        setTimeout(() => {
                            setMessage(null)
                            setMessageClass(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setMessage(
                            `Henkilö '${newName}' oli jo poistettu palvelimelta`
                        )
                        setMessageClass('error')
                        setTimeout(() => {
                            setMessage(null)
                            setMessageClass(null)
                        }, 5000)
                        setPersons(persons.filter(n => n.id !== id))
                    })
            }
        } else {
            personsService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setMessage(`Lisättiin ${returnedPerson.name}`)
                    setMessageClass('message')
                    setTimeout(() => {
                        setMessage(null)
                        setMessageClass(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage(error.response.data.error)
                    setMessageClass('error')
                    setTimeout(() => {
                        setMessage(null)
                        setMessageClass(null)
                    }, 5000)
                })
        }
    }

    const removePerson = id => {
        const person = persons.find(n => n.id === id)

        if (window.confirm(`Poistetaanko ${person.name}`)) {
            personsService
                .remove(id)
                .then(returnedPerson => {
                    setPersons(persons.filter(n => n.id !== id))
                    setMessage(`Poistettiin ${person.name}`)
                    setMessageClass('message')
                    setTimeout(() => {
                        setMessage(null)
                        setMessageClass(null)
                    }, 5000)
                })

        }

    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Notification message={message} messageClass={messageClass} />
            <Filter
                search={search}
                handleSearchChange={handleSearchChange}
            />
            <h3>lisää uusi</h3>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numerot</h2>
            <Persons personsToShow={personsToShow}
                removePerson={removePerson}
            />
        </div>
    )

}

export default App