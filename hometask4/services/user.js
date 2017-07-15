class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

const users = [
    new User(1, 'Eduard', 'eduard@gmail.com'),
    new User(2, 'Nicola', 'nicola@gmail.com'),
    new User(3, 'Vasia', 'vasia@gmail.com'),
    new User(4, 'Ivan', 'ivan@gmail.com'),
    new User(5, 'Petia', 'petia@gmail.com'),
    new User(6, 'Leon', 'leon@gmail.com')
];

function nextUserId() {
    return users.reduce((a, b) => a.id > b.id ? a.id : b.id, -1) + 1;
}

module.exports = {
    newUser: function (json) {
        return new User(nextUserId(), json.name, json.email);
    },

    /**
     * Returns a user by the given id.
     */
    findById: function (id) {
        var filtered = users.filter(user => user.id == id);
        if (filtered.length != 1) {
            throw new Error('No such user with id ${id} found');
        }
        return filtered[0];
    },

    add: function (user) {
        users.push(user);
    },

    deleteById: function (id) {
        var index = users.findIndex((user) => user.id == id);
        if (index == -1) {
            throw new Error('No such user with id ${id} found')
        }
        delete users[index];
    },

    /**
     * Updates a user with the given id by setting his properties to the given one and returns an updated user.
     * @param id an id of a user to update
     * @param properties an object with properties to set
     */
    updateById: (id, properties) => {
        var user = module.exports.findById(id);
        for (let propertyName in properties) {
            if (user.hasOwnProperty(propertyName)) {
                user[propertyName] = properties[propertyName]
            }
        }
        return user;

    }
};










