export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const FILTER_USER = 'FILTER_USER';

export function addUser(username) {
    return {type: ADD_USER, username: username};
}

export function deleteUser(id) {
    return {type: DELETE_USER, id: id};
}

export function filterUser(criteria) {
    return {type: FILTER_USER, criteria: criteria};
}