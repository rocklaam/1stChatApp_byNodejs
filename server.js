var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var memories = [];
app.use(express.static(__dirname + ''));

// Register event for sever side socket
io.on('connection', function (socket) {
    socket.on('chatMessage', function (from, msg) {
        //create history to show to a new member (client) after joining
        var memory = {};
        memory.from = from;
        memory.msg = msg;
        memories.push(memory);
        //emit event to all clients in chat room to show the message
        io.emit('chatMessage', from, msg);
    });
    socket.on('notifyUser', function (user) {
        io.emit('notifyUser', user);
    });
    //Handle event when a new client join to chat group
    socket.on('newUser', function (from, userName, msg) {
        // to show all client that a new member has joined the cha group
        io.emit('chatMessage', from, msg);
        // to load history for a new member
        io.emit('newUser', userName, memories);
    });
});

app.listen(8088)
