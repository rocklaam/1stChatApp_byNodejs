//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('chatService', function () {
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
});