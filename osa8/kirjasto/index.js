require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

mongoose.set('useFindAndModify', false)

console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
      
    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            authorName: String!
            authorBorn: Int
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (!args.author && !args.genre) {
                return Book.find({})
            }

            if (args.author && args.genre) {
                return Book.find({ 'author.name': args.author, genres: { $in: [args.genre] } })
            }

            if (args.genre) {
                return Book.find({ genres: { $in: [args.genre] } })
            }

            return Book.find({ 'author.name': args.author })
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Book: {
        author: (root) => {
            return {
                name: root.authorName,
                born: root.authorBorn
            }
        }
    },
    Author: {
        bookCount: (root) => {
            return books.filter((book) => book.author === root.name).length
        }
    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            if (await Author.findOne({ name: args.authorName })) {
                const newAuthor = new Author({ name: args.authorName })
                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            const book = new Book({ ...args })

            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return book
        },
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author
        },
        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})