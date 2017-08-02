import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {deleteUser} from '../actions'
import './User.css'

let User = ({onDelete, id, username}) => (
    <div className="user">
        <span className="username">{username}</span>
        <a href="#" className="delete" onClick={onDelete}>Delete</a>
    </div>
);

User.propTypes = {
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDelete: () => dispatch(deleteUser(ownProps.id))
    }
};

User = connect(null, mapDispatchToProps)(User);

export default User


