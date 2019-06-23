import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
    return (
        <div>
            <h2>Users</h2>
            <div className="users">
                <div className="user">
                    <div></div>
                    <div>
                        <strong>blogs created</strong>
                    </div>
                </div>
                {props.users.map(user =>
                    <div key={user.id} className="user">
                        <div className="username">
                            <Link to={`/users/${user.id}`}>
                                {user.name}
                            </Link>
                        </div>
                        <div className="userBlogCount">
                            {user.blogs.length}
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Users)