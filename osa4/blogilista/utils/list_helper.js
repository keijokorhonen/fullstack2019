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
        return {}
    }

    var mostLikes = blogs[0].likes
    var indexOfFavorite = 0

    for (var i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes
            indexOfFavorite = i
        }
    }

    return blogs[indexOfFavorite]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}