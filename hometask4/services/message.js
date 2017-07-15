class Message {
    constructor (id, senderId, receiverId, text) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.text = text;
    }
}

const messages = [
    new Message(0, 1, 2, "Hi!"),
    new Message(1, 2, 1, "Hello :)"),
    new Message(2, 1, 3, "What is up?")
];

function nextMessageId() {
    return messages.reduce((a, b) => a.id > b.id ? a.id : b.id, -1) + 1;
}

module.exports = {
    newMessage: function (json) {
        return new Message(nextMessageId(), json.senderId, json.receiverId, json.text);
    },

    /**
     * Returns a message by the given id.
     */
    findById: function (id) {
        var filtered = messages.filter(message => message.id == id);
        if (filtered.length != 1) {
            throw new Error('No such message with id ${id} found');
        }
        return filtered[0];
    },

    /**
     * Returns messages with the given id if a sender.
     */
    findBySenderIdId: function (senderId) {
        return messages.filter(message => message.senderId == senderId);
    },

    add: function (message) {
        messages.push(message);
    },

    deleteById: function (id) {
        var index = messages.findIndex((message) => message.id == id);
        if (index == -1) {
            throw new Error('No such message with id ${id} found')
        }
        delete messages[index];
    },

    /**
     * Updates a message with the given id by setting his properties to the given one and returns an updated message.
     * @param id an id of a message to update
     * @param properties an object with properties to set
     */
    updateById: (id, properties) => {
        var message = module.exports.findById(id);
        for (let propertyName in properties) {
            if (message.hasOwnProperty(propertyName)) {
                message[propertyName] = properties[propertyName]
            }
        }
        return message;

    }
};

