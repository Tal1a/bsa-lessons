import React, {Component} from 'react'
import User from './User'
import './UserList.css'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: nextProps.users});
    }

    render() {
        let users = this.state.users;
        let userComponents = users.map((user) => {
            return <User key={user.id} id={user.id} username={user.username} onDelete={this.props.onDelete}/>
        });
        return <div className="user-list">{userComponents}</div>;
    }
}

export default UserList

