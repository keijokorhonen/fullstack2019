import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo-hooks'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [result, setResult] = useState(null)
  const [genre, setGenre] = useState('')
  const client = useApolloClient()

  const queryForGenres = async () => {
    const { data } = await client.query({
      query: ALL_GENRES,
      fetchPolicy: 'no-cache'
    })

    setGenres(data.allGenres)
  }

  const queryForBooks = async () => {
    const result = await client.query({
      query: BOOKS_FROM_GENRE,
      variables: { genre: genre },
      fetchPolicy: 'no-cache'
    })
    setResult(result)
  }

  useEffect(() => {
    queryForGenres()
  }, [props.show])

  useEffect(() => {
    queryForBooks()
  }, [genre, props.show])

  const genreButtons = () => {
    return (
      <div>
        {genres.map(g =>
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    )
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genreButtons()}
    </div>
  )
}

const ALL_GENRES = gql`
{
  allGenres
}
`

const BOOKS_FROM_GENRE = gql`
query allBooks($genre: String){
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
  }
}
`

export default Books