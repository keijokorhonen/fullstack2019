import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const classes = `notification ${notification.class}`

    return (
        <div className={classes}>
            {notification.message}
        </div>
    )
}

export default Notification