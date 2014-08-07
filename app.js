var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/resources'));

app.get('/', function(req,res) {
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    socket.on('place', function (data) {
        if (data.neta) {
            socket.broadcast.emit('placed', { neta: data.neta });
        }
    });
});

server.listen(8000);
