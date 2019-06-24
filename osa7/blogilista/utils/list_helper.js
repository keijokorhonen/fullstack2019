const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce(reducer)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return {
            title: undefined,
            author: undefined,
            likes: undefined
        }
    }

    var mostLikes = blogs[0].likes
    var indexOfFavorite = 0

    for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes
            indexOfFavorite = i
        }
    }

    return {
        title: blogs[indexOfFavorite].title,
        author: blogs[indexOfFavorite].author,
        likes: blogs[indexOfFavorite].likes
    }
}

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return {
            author: undefined,
            blogs: undefined
        }
    }

    const authorsSortedByCount = _.chain(blogs.map(blog => blog.author)).countBy().value()

    return {
        author: _.findLastKey(authorsSortedByCount),
        blogs: _.findLast(authorsSortedByCount)
    }
}

const mostLikes = blogs => {
    if (blogs.length === 0) {
        return {
            author: undefined,
            likes: undefined
        }
    }

    var authorsAndLikes = []

    _.chain(blogs)
        .groupBy('author')
        .forEach(author => {
            const likes = _.sumBy(author, 'likes')
            authorsAndLikes.push({
                author: author[0].author,
                likes: likes
            })
        })
        .value()

    const mostLikedAuthor = _.maxBy(authorsAndLikes, 'likes')

    return {
        author: mostLikedAuthor.author,
        likes: mostLikedAuthor.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}