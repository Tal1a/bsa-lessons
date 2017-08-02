import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addUser } from '../actions'

import './AddUser.css'

let AddUser = ({onAdd}) => {
    let input;

    let handleSubmit = (event) => {
        event.preventDefault();

        if (!input.value.trim()) {
            return
        }

        onAdd(input.value);

        input.value = ''
    };

    return (
        <form className="add-user" onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" className="username" ref={(node) => {input = node}}/>
            </label>
            <input type="submit" className="add" value="Add"/>
        </form>
    )
};

AddUser.propTypes = {
    onAdd: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAdd: (username) => dispatch(addUser(username))
    }
};

AddUser = connect(null, mapDispatchToProps)(AddUser);

export default AddUser


