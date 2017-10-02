var socket = io();
function submitfunction() {
    var from = $('#user').val();
    var message = $('#m').val();
    if (message != '') {
        socket.emit('chatMessage', from, message);
    }
    $('#m').val('').focus();
    return false;
}

function notifyTyping() {
    var user = $('#user').val();
    socket.emit('notifyUser', user);
}

socket.on('chatMessage', function (from, msg) {
    var me = $('#user').val();
    var color = (from == me) ? 'green' : '#009afd';
    var from = (from == me) ? 'Me' : from;
    $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function (user) {
    var me = $('#user').val();
    if (user != me) {
        $('#notifyUser').text(user + ' is typing ...');
    }
    setTimeout(function () { $('#notifyUser').text(''); }, 10000);;
});

socket.on('newUser', function (userName, memories) {
    var me = $('#user').val();
    if (userName != me) {
        return;
    }
    // console.log(memories);
    var color = '#009afd';
    for (var index = 0; index < memories.length; index++) {
        $('#messages').append('<li><b style="color:' + color + '">' + memories[index].from + '</b>: '
            + memories[index].msg + '</li>');
    }
});

$(document).ready(function () {
    var name = makeid();
    $('#user').val(name);
    console.log(name);
    // socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
    socket.emit('newUser', 'System', name, '<b>' + name + '</b> has joined the discussion');
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}