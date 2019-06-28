import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { gql } from 'apollo-boost'
import { useApolloClient, useQuery, useMutation } from 'react-apollo-hooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    console.log(error)
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  const client = useApolloClient()

  const authorsResult = useQuery(ALL_AUTHORS)

  const createBook = useMutation(CREATE_BOOK, {
    onError: handleError,
  })

  const editAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const login = useMutation(LOGIN)

  const showWhenLoggedOut = {display: !token ? 'inline-block' : 'none'}
  const showWhenLoggedIn = {display: !token ? 'none' : 'inline-block'}

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <div style={showWhenLoggedOut}>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <div style={showWhenLoggedIn}>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </div>
      </div>

      <Authors
        show={page === 'authors'}
        result={authorsResult}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        createBook={createBook}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        redirectToHome={() => setPage('authors')}
        handleError={handleError}
      />

      <Recommend
        show={page === 'recommend'}
      />

    </div>
  )
}

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title, 
    authorName: $author,
    published: $published,
    genres: $genres
  ) {
    title
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export default App
