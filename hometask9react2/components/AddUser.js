import React, { Component } from 'react'
// import { connect } from 'react-redux'
import './AddUser.css'

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: ''
        }
    }

    handleSubmit(event) {
        this.props.onAdd(this.state.username);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({username: event.target.value})
    }

    render() {
        return <form className="add-user" onSubmit={this.handleSubmit}>
            <label>
                Username:
                <input type="text" className="username" value={this.state.username} onChange={this.handleChange}/>
            </label>
            <input type="submit" className="add" value="Add"/>
        </form>

    }
}

export default AddUser


