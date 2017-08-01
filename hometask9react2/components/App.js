import React, {Component} from 'react'
// import { connect } from 'react-redux'
import UserList from './UserList'
import AddUser from './AddUser'
import FilterUser from './FilterUser'

class App extends Component {
    constructor(props) {
        super(props);

        this.nextUserId = 0;

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFilter = this.handleFilter.bind(this);

        this.state = {
            users: [this.createUser("Ivan"), this.createUser("Vasia")],
            criteria: ''
        };
    }

    handleAdd(username) {
        let user = this.createUser(username);
        let users = this.state.users.concat([user]);
        this.setState({users: users});
    }

    handleDelete(id) {
        let users = this.state.users;
        users = users.filter((user) => user.id != id);
        this.setState({users: users});

    }

    createUser(username) {
        return {
            id: this.nextUserId++,
            username: username
        }
    }

    handleFilter(criteria) {
        this.setState({criteria: criteria});
    }

    render() {
        let users = this.state.users;
        let criteria = this.state.criteria;

        return <div class="app">
            <AddUser onAdd={this.handleAdd}/>
            <FilterUser onFilter={this.handleFilter}/>
            <UserList users={users} criteria={criteria} onDelete={this.handleDelete}/>
        </div>;
    }
}

export default App


