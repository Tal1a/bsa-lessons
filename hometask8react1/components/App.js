import React, {Component} from 'react'
import UserList from './UserList'
import AddUser from './AddUser'

class App extends Component {
    constructor(props) {
        super(props);

        this.nextUserId = 0;

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            users: [this.createUser("Ivan"), this.createUser("Vasia")]
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

    render() {
        let users = this.state.users;
        return <div class="app">
            <AddUser onAdd={this.handleAdd}/>
            <UserList users={users} onDelete={this.handleDelete}/>
        </div>;
    }
}

export default App


