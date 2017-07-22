$(function () {
    const socket = io.connect("/");
    let nicknameByUsername = {};

    var myUsername;
    var myNickname;

    $('#join').click(() => {
        if (!$('#username').val() || !$('#nickname').val()) {
            // показати помилку чи подсвітити поле
            return;
        }

        myUsername = $('#username').val();
        myNickname = $('#nickname').val();
        emitAddUser(myUsername, myNickname);
    });

    $("#send").click(() => {
        let text = $('#text').val();
        socket.emit('new message', text);
        handleNewMessage(myUsername, text);
    });

    var typingTimerId;

    $('#text').keydown(() => {
        socket.emit('typing');
        if (typingTimerId) {
            clearTimeout(typingTimerId);
        }
        typingTimerId = setTimeout(() => {
            typingTimerId = undefined;
            socket.emit('stop typing');
        }, 3 * 1000)
    });

    function handleJoined(users, messages) {
        $('#login').css('display', 'none');
        $('#chat').addClass('show');
        $("#users").empty();
        $("#messages").find('.message').remove();
        handleNewUser(myUsername, myNickname, 'online');
        users.forEach(user => handleNewUser(user.username, user.nickname, user.status));
        messages.forEach(message => handleNewMessage(message.username, message.text));
    }

    function handleUserJoined(username, nickname) {
        handleNewUser(username, nickname, 'just-appeared');

        // змінюєм статус на online через 1 хвилину
        setTimeout(() => changeUserStatus(username, "online"), 60 * 1000);
    }
    
    function handleUserLeft(username) {
        handleNewUser(username, nickname, 'offline');
    }

    function changeUserStatus(username, status) {
        $("#users").find("div[username=" + username + "]").find(".status").text(status);
    }

    function handleNewUser(username, nickname, status) {
        if (nicknameByUsername.hasOwnProperty(username)) {
            changeUserStatus(username, status);
        } else {
            nicknameByUsername[username] = nickname;
            let user = $('<div/>').addClass('user').attr('username', username);
            let name = $('<div/>').addClass('name').text(username + ' (' + nickname + ')');
            if (username == myUsername) {
                name.addClass('current');
            }
            name.appendTo(user);
            $('<div/>').addClass('status').text(status).appendTo(user);
            $('#users').append(user);
        }
    }

    function handleNewMessage(username, text) {
        let messages = $('#messages');
        if (messages.children().length >= 100) {
            messages.find('div.message').first().remove();
        }
        let message = $('<div/>').addClass('message');
        $('<div/>').addClass('sender').text(username + ' (' + nicknameByUsername[username] + ')').appendTo(message);
        $('<div/>').addClass('text').text(text).appendTo(message);
        messages.append(message);
    }

    function emitAddUser(username, nickname) {
        socket.emit('add user', username, nickname);
    }

    socket.on('joined', function (data) {
        handleJoined(data.users, data.messages);
    });

    socket.on('user joined', function (data) {
        handleUserJoined(data.username, data.nickname);
        console.log('User %s (%s) is online', data.username, data.nickname);
    });

    socket.on('user left', function (data) {
        handleUserLeft(data.username);
        console.log('User %s (%s) is offline', data.username);
    });

    socket.on('new message', function (data) {
        handleNewMessage(data.username, data.text);
        console.log("New message '%s' from [%s] received", data.text, data.username);
    });

    // socket.on('send', function(data) {
    //     console.log("New message '%s' from [%s] send", data.message, data.username);               /*sent massage*/
    // });

    socket.on('typing', function (data) {
        let typing = $("#typing");
        typing.text(data.username + " is typing...");
        typing.css('visibility', 'visible');
    });

    socket.on('stop typing', function (data) {
        let typing = $("#typing");
        typing.css('visibility', 'hidden');
        console.log("'%s' stopped typing", data.username);
    });

    socket.on('reconnect', function () {
        if (myUsername) {
            nicknameByUsername = {};
            emitAddUser(myUsername, myNickname);
        }
    });
    //
    // socket.emit('new message', "test");
    // socket.emit('typing');
    // socket.emit('stop typing');
});