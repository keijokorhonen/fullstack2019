import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from 'react-apollo-hooks'

const Recommend = (props) => {
    const [result, setResult] = useState(null)
    const [books, setBooks] = useState([])
    const client = useApolloClient()

    const queryForMe = async () => {
        const result = await client.query({
            query: ME
        })
        setResult(result)
    }

    const queryForBooks = async () => {
        const { data } = await client.query({
            query: FAVORITE_BOOKS,
            variables: { favoriteGenre: result.data.me.favoriteGenre },
            fetchPolicy: 'no-cache'
        })
        setBooks(data.allBooks)
    }

    useEffect(() => {
        queryForMe()       
    }, [props.show])

    useEffect(() => {
        if (result) {
            queryForBooks()
        }
    }, [result])

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
            <h2>recommendations</h2>

            books in your favorite genre <strong>{result.data.me.favoriteGenre}</strong>
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
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

const ME = gql`
  query {
    me  {
      favoriteGenre
    }
  }
`

const FAVORITE_BOOKS = gql`
  query allBooks($favoriteGenre: String){
    allBooks(genre: $favoriteGenre)  {
      title
      author {
          name
      }
      published
    }
  }
`

export default Recommend