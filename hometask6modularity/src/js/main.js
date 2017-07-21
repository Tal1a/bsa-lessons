var UserList = require('./user-list');
require('../css/style.css');

const users = [
    { name: 'Oksana', age: 22 },
    { name: 'Viktor', age: 14 },
    { name: 'Ivan', age: 37 },
    { name: 'Yana', age: 45 },
    { name: 'Oleksandr', age: 19},
    { name: 'Olena', age: 18},
    { name: 'Mykola', age: 27},
    { name: 'Andriy', age: 33},
    { name: 'Fox', age: 32},
    { name: 'Zakhar', age: 40}
];

var list = new UserList(users);
list.show();