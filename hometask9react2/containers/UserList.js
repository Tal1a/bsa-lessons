import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import User from './User'

import './UserList.css'

let UserList = ({users}) => {
    let userComponents = users.map((user) => {
        return <User key={user.id} id={user.id} username={user.username}/>
    });
    return <div className="user-list">{userComponents}</div>;
};

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired
        })
    )
};

const mapStateToProps = state => {
    return {
        users: state.users.filter((user) => state.criteria == 'undefined' || state.criteria.length == 0 ||
            user.username.startsWith(state.criteria))
    }
};

UserList = connect(mapStateToProps)(UserList);

export default UserList

