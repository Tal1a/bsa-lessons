import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { filterUser } from '../actions'

let FilterUser = ({onFilter}) => {
    let input;

    const handleFilter = (event) => {
        console.log("handleFilter");
        onFilter(input.value);
    };

    return (
        <div id="filter-user">
            <input type="text" className="criteria"  ref={(node) => {input = node}}
                   onChange={handleFilter}/>
        </div>
    );
};

FilterUser.propTypes = {
    onFilter: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onFilter: (criteria) => dispatch(filterUser(criteria))
    }
};

FilterUser = connect(null, mapDispatchToProps)(FilterUser);

export default FilterUser


