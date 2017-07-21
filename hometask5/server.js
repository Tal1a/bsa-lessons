module.exports = function (io) {
    let users = new Map();
    let messages = [];

    io.on('connection', function (socket)  {
        console.log("Client connected to server");

        let addedUser = false;
        //масив всіх онлайн юзерів

        socket.on('new message', function (text) {
            console.log("Handling [new message]");
            let message = {
                username: socket.username,
                text: text
            };

            if (messages.length >= 100) {
                messages.shift();
            }
            messages.push(message);
            
            socket.broadcast.emit('new message', message);
        });
        // Register a new handler for the given event
        socket.on('add user', function (username, nickname) {
            console.log("Adding user '%s' with nickname '%s'", username, nickname);

            if (addedUser) {
                return;
            }

            // не додавати користувача якщо вже є інший з таким самим username
            
            socket.username = username;
            socket.nickname = nickname;

            addedUser = true;

            //список всіх онлайн користувачів виключаючи поточного + історія повідомлень
            socket.emit('joined', {
                "users": Array.from(users.values()),
                "messages": messages
            });

            let user = {"username": username, "nickname": nickname, "status": "online"};
            users.set(username, user);

            socket.broadcast.emit('user joined',{
                username: socket.username,
                nickname: socket.nickname
            });
        });

        socket.on('disconnect', function () {
            let user = users.get(socket.username);
            if (user) {
                // видаляти користувача зі списку якщо він offline більше ніж X хвилин
                user.status = "offline";
                socket.broadcast.emit('user left', {
                    username: socket.username
                });
            }
        });

        socket.on('typing', function () {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
            console.log("'%s' is typing", socket.username);
        });

        socket.on('stop typing', function () {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
            console.log("'%s' stopped typing", socket.username);

        });
    });

    return {};
};

