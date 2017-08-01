import React, {Component} from 'react'
// import { connect } from 'react-redux'
import User from './User'
import './UserList.css'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            criteria: this.props.criteria
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: nextProps.users, criteria: nextProps.criteria});
    }


    render() {
        let criteria = this.state.criteria;
        let users = this.state.users;
        users = users.filter((user) => criteria.length == 0 || user.username.startsWith(criteria));
        let userComponents = users.map((user) => {
            return <User key={user.id} id={user.id} username={user.username} onDelete={this.props.onDelete}/>
        });
        return <div className="user-list">{userComponents}</div>;
    }
}

export default UserList

