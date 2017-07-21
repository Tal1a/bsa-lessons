var _ = require('lodash');

const avatar = require("../img/human-greeting.png");

// його не має бути в prod бандлі

module.exports = function(users) {
    const container = document.getElementById('users');
    const sortedUsers = _.sortBy(users, (user) => user.age);
    this.show = () => {
        sortedUsers.forEach((user) => {
            const div = document.createElement("div");
            div.className = "user";
            container.appendChild(div);
            
            let name = document.createElement("div");
            name.className = "name";
            name.append(user.name + ' ' + user.age);
            div.appendChild(name);


            let img = document.createElement("img");
            img.className = "avatar";
            img.src = avatar;
            div.appendChild(img);
        });
    }
};