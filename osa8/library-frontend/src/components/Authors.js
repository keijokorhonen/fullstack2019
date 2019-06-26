import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }
  
  const submit = async (e) => {
    e.preventDefault()
    
    await props.editAuthor({
      variables: { name: name.value, born: parseInt(born) }
    })

    setName('')
    setBorn('')
  }

  if (props.result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const options = props.result.data.allAuthors.map(a => (
    {
      value: a.name,
      label: a.name
    }
  ))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <label>name</label>
          <Select 
            value={name}
            onChange={selectedOption => setName(selectedOption)}
            options={options}
          />
        </div>
        <div>
          <label>born</label>
          <input 
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors