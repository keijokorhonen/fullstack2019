import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    if (props.notification === null) {
        return <div></div>
    }

    const classes = `notification ${props.notification.type}`

    return (
        <div className={classes}>
            {props.notification.message}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps)(Notification)