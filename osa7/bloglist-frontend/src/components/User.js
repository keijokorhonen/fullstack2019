import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
    console.log(props.users)
    console.log(props.id)
    const user = props.users.find(u => u.id === props.id)

    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <strong>added blogs</strong>
            <ul>
                {user.blogs.map(b =>
                    <li key={b.id}>
                        {b.title}
                    </li>)
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(User)