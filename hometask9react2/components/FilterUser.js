import React, { Component } from 'react'


class FilterUser extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            criteria: ''
        }
    }
    
    handleChange(event) {
        this.setState({criteria: event.target.value}, () => this.props.onFilter(this.state.criteria));
    }
    
    render() {
        return <div id="filter-user">
            <input type="text" className="criteria" value={this.state.criteria} onChange={this.handleChange}/>
        </div>
    }
}

export default FilterUser


