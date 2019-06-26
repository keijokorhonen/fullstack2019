import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks'

const App = () => {
  const [page, setPage] = useState('authors')

  const booksResult = useQuery(ALL_BOOKS)

  const authorsResult = useQuery(ALL_AUTHORS)

  const createBook = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const editAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={authorsResult}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={booksResult}
      />

      <NewBook
        show={page === 'add'}
        createBook={createBook}
      />

    </div>
  )
}

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title, 
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!){
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
  }
}
`

export default App
