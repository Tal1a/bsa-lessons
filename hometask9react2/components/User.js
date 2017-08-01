import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './User.css'

class User extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            id: this.props.id,
            username: this.props.username
        }
    }

    handleDelete() {
        this.props.onDelete(this.state.id);
    }

    render() {
        let username = this.state.username;
        return <div className="user">
            <span className="username">{username}</span>
            <a href="#" className="delete" onClick={this.handleDelete}>Delete</a>
        </div>;
    }
}

export default User


