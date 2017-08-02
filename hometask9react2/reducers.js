import {ADD_USER, DELETE_USER, FILTER_USER} from "./actions"

export default function todoApp(state = {}, action) {
    return {
        users: users(state.users, action),
        criteria: criteria(state.criteria, action)
    }
}

function users(users = [], action) {
    switch (action.type) {
        case ADD_USER:
            return [...users, createUser(action.username)];
        case DELETE_USER:
            return users.filter((user) => user.id != action.id);
        default:
            return users;
    }
}

function criteria(criteria = '', action) {
    switch (action.type) {
        case FILTER_USER:
            return action.criteria;
        default:
            return criteria;
    }
}

function createUser(username) {
    return {
        id: nextUserId++,
        username: username
    }
}

var nextUserId = 0;